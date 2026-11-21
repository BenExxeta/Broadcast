/**
 * Shared domain types. Everything the app stores or renders goes through these.
 */

export const CATEGORIES = [
  'Safety',
  'Transport & Traffic',
  'Weather',
  'Politics & Administration',
  'Events & Culture',
  'Economy',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Lang = 'de' | 'en';
export const LANGS: Lang[] = ['de', 'en'];

export type Localized = Record<Lang, string>;

/** Photo for an article. Credit and licence are shown next to the image. */
export interface ArticleImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

/** What we keep from a feed item. We never store the full article text. */
export interface RawArticle {
  url: string;
  title: string;
  excerpt: string;
  source: string;
  publishedAt: string; // ISO 8601
  image?: ArticleImage;
}

/** Output of the AI step (Claude in live mode, a lookup table in mock mode). */
export interface Analysis {
  relevance: number; // 0-10, for foreigners living in Guadalajara
  category: Category;
  title: Localized;
  summary: Localized; // 2-4 sentences
  whyItMatters: Localized; // one line
}

/** A processed article as shown on the site. */
export interface Article extends RawArticle {
  id: string;
  analysis: Analysis;
  processedAt: string;
  isSample: boolean;
}

export interface RatingEntry {
  articleId: string;
  score: number; // 1-5
  at: string;
}

export interface ReportEntry {
  articleId: string;
  at: string;
}

/** Someone who asked for the daily e-mail summary. The token is used for the unsubscribe link. */
export interface Subscriber {
  email: string;
  lang: Lang;
  topics: Category[];
  token: string;
  createdAt: string;
}
