import { isMockMode } from '../config';
import type { Analysis, RawArticle } from '../types';
import { claudeAnalyzer } from './claude';
import { mockAnalyzer } from './mock';

/** One interface for both the mock and the Claude-backed analyzer. */
export interface Analyzer {
  analyze(article: RawArticle): Promise<Analysis>;
}

export function getAnalyzer(): Analyzer {
  return isMockMode() ? mockAnalyzer : claudeAnalyzer;
}
