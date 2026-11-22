import type { Analyzer } from './index';
import { SAMPLE_ANALYSES } from './sample-news';
import { LANGS, type Analysis, type Localized, type RawArticle } from '../types';

/**
 * Mock analyzer: returns the canned analysis for sample articles. Unknown URLs
 * get relevance 0, so they are filtered out of the edition instead of showing
 * made-up content.
 */
export const mockAnalyzer: Analyzer = {
  async analyze(article: RawArticle): Promise<Analysis> {
    const canned = SAMPLE_ANALYSES[article.url];
    if (canned) return canned;
    // Not a sample article: give it the original text in every language. Relevance 0 keeps it off the edition.
    const same = (text: string): Localized => Object.fromEntries(LANGS.map((lang) => [lang, text])) as Localized;
    return {
      relevance: 0,
      category: 'Events & Culture',
      title: same(article.title),
      summary: same(article.excerpt),
      whyItMatters: same(''),
    };
  },
};
