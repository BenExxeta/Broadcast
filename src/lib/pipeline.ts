import { getAnalyzer } from './ai';
import { sampleRawArticles } from './ai/sample-news';
import { config, isMockMode } from './config';
import { fetchAllFeeds } from './ingest/rss';
import { articleId, store } from './store';
import type { RawArticle } from './types';

export interface RefreshSummary {
  mode: 'mock' | 'live';
  fetched: number;
  processed: number;
  cached: number;
  failed: number;
  refreshedAt: string;
}

/**
 * Ingest, analyse and store. Articles whose id is already in the AI cache are
 * stored again with fresh metadata but are not sent to the model.
 */
export async function refreshNews(): Promise<RefreshSummary> {
  const mock = isMockMode();
  const items: RawArticle[] = mock ? sampleRawArticles() : await fetchAllFeeds();
  const analyzer = getAnalyzer();
  const summary: RefreshSummary = {
    mode: mock ? 'mock' : 'live',
    fetched: items.length,
    processed: 0,
    cached: 0,
    failed: 0,
    refreshedAt: new Date().toISOString(),
  };

  for (const raw of items) {
    try {
      const cached = store.getAnalysis(articleId(raw.url));
      if (cached) {
        summary.cached += 1;
        store.saveArticle(raw, cached, mock);
        continue;
      }
      const analysis = await analyzer.analyze(raw);
      store.saveArticle(raw, analysis, mock);
      summary.processed += 1;
    } catch (error) {
      summary.failed += 1;
      console.warn(`[refresh] skipped "${raw.title}": ${String(error)}`);
    }
  }

  store.setLastRefresh(summary.refreshedAt);
  return summary;
}
