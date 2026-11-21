import Parser from 'rss-parser';
import { config } from '../config';
import type { RawArticle } from '../types';

/**
 * Fetches all enabled RSS feeds from config/sources.json. Only title, a short
 * plain-text excerpt, link, source and date are kept. A failing feed is logged
 * and skipped so one bad source does not break the refresh.
 */
const parser = new Parser({
  timeout: 15_000,
  headers: { 'User-Agent': 'Abroadcast/1.0 (university prototype)' },
});

function toExcerpt(html: string): string {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > config.excerptChars ? `${text.slice(0, config.excerptChars).trimEnd()}…` : text;
}

async function fetchFeed(feed: { name: string; feedUrl: string }): Promise<RawArticle[]> {
  const parsed = await parser.parseURL(feed.feedUrl);
  const cutoff = Date.now() - config.ingestWindowHours * 3_600_000;

  return parsed.items.flatMap((item) => {
    const published = item.isoDate ?? item.pubDate;
    const time = published ? new Date(published).getTime() : NaN;
    if (!item.link || !item.title || Number.isNaN(time) || time < cutoff) return [];
    return [
      {
        url: item.link,
        title: item.title.trim(),
        excerpt: toExcerpt(item.contentSnippet ?? item.content ?? item.summary ?? ''),
        source: feed.name,
        publishedAt: new Date(time).toISOString(),
      },
    ];
  });
}

export async function fetchAllFeeds(): Promise<RawArticle[]> {
  const results = await Promise.allSettled(config.sources.map(fetchFeed));
  return results.flatMap((result, i) => {
    if (result.status === 'fulfilled') return result.value;
    console.warn(`[ingest] ${config.sources[i].name} failed: ${String(result.reason)}`);
    return [];
  });
}
