import type { Analyzer } from './index';
import { SAMPLE_ANALYSES } from './sample-news';
import type { Analysis, RawArticle } from '../types';

/**
 * Mock analyzer: returns the canned analysis for sample articles. Unknown URLs
 * get relevance 0, so they are filtered out of the edition instead of showing
 * made-up content.
 */
export const mockAnalyzer: Analyzer = {
  async analyze(article: RawArticle): Promise<Analysis> {
    const canned = SAMPLE_ANALYSES[article.url];
    if (canned) return canned;
    return {
      relevance: 0,
      category: 'Events & Culture',
      title: { en: article.title, de: article.title },
      summary: { en: article.excerpt, de: article.excerpt },
      whyItMatters: { en: '', de: '' },
    };
  },
};
