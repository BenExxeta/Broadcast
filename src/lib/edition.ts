import { config, isMockMode } from './config';
import { refreshNews } from './pipeline';
import { store } from './store';
import type { Article, Category } from './types';

/** Mock data is re-generated at most this often, so the edition stays inside its window. */
const MOCK_STALE_MS = 60 * 60 * 1000;

/** Makes sure there is something to show: seeds the store on first run and refreshes stale mock data. */
async function ensureFresh(): Promise<void> {
  const { lastRefresh } = store.snapshot();
  const stale = !lastRefresh || Date.now() - Date.parse(lastRefresh) > MOCK_STALE_MS;
  const empty = store.listArticles().length === 0;
  if ((isMockMode() && stale) || empty) await refreshNews();
}

/** Articles that pass the relevance threshold and fall in the edition window, most relevant first. */
export async function loadEdition(now: Date = new Date()): Promise<Article[]> {
  await ensureFresh();
  const cutoff = now.getTime() - config.editionWindowHours * 3_600_000;
  return store
    .listArticles()
    .filter((a) => a.analysis.relevance >= config.relevanceThreshold)
    .filter((a) => Date.parse(a.publishedAt) >= cutoff)
    .sort(
      (a, b) =>
        b.analysis.relevance - a.analysis.relevance ||
        Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
    );
}

export function filterByCategory(articles: Article[], category?: Category): Article[] {
  return category ? articles.filter((a) => a.analysis.category === category) : articles;
}

export function findArticle(id: string): Article | undefined {
  return store.getArticle(id);
}
