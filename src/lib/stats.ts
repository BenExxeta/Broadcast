import { dayKey } from './dates';
import { store } from './store';
import type { Article } from './types';

export interface ArticleStats {
  article: Article;
  ratings: number;
  avgRating: number | null;
  reports: number;
}

export interface DayStats {
  day: string;
  visits: number;
  unique: number;
}

export interface Stats {
  visitsToday: number;
  uniqueToday: number;
  visitsTotal: number;
  ratingCount: number;
  avgRating: number | null;
  reportCount: number;
  byDay: DayStats[];
  perArticle: ArticleStats[];
  lastRefresh: string | null;
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) / 10;
}

/** Aggregates the anonymous visit, rating and report logs for /stats. */
export function computeStats(now: Date = new Date()): Stats {
  const snap = store.snapshot();
  const today = dayKey(now);
  const byDay = Object.entries(snap.visits)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([day, v]) => ({ day, visits: v.count, unique: v.visitors.length }));

  const perArticle = Object.values(snap.articles)
    .map((article): ArticleStats => {
      const scores = snap.ratings.filter((r) => r.articleId === article.id).map((r) => r.score);
      return {
        article,
        ratings: scores.length,
        avgRating: average(scores),
        reports: snap.reports.filter((r) => r.articleId === article.id).length,
      };
    })
    .sort((a, b) => b.reports - a.reports || b.ratings - a.ratings);

  return {
    visitsToday: snap.visits[today]?.count ?? 0,
    uniqueToday: snap.visits[today]?.visitors.length ?? 0,
    visitsTotal: byDay.reduce((sum, d) => sum + d.visits, 0),
    ratingCount: snap.ratings.length,
    avgRating: average(snap.ratings.map((r) => r.score)),
    reportCount: snap.reports.length,
    byDay,
    perArticle,
    lastRefresh: snap.lastRefresh,
  };
}
