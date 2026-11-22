import Anthropic from '@anthropic-ai/sdk';
import { CATEGORIES, LANGS, type Analysis, type Category, type Localized, type RawArticle } from '../types';
import { config } from '../config';
import type { Analyzer } from './index';

/**
 * Claude analyzer. Sends only title and excerpt (never full article text) and
 * asks for a JSON object that we validate before storing.
 */
const SYSTEM_PROMPT = `You help foreigners who live in Guadalajara, Mexico, understand local news.
For each news item, return ONLY a JSON object (no markdown) with these keys:
- "relevance": integer 0-10, how much this affects a foreigner living in Guadalajara (safety, transport, weather, administration, big events, economy). Routine sports, celebrity or national politics scores low.
- "category": one of ${CATEGORIES.map((c) => `"${c}"`).join(', ')}.
- "title": a short headline in each of these languages: ${LANGS.map((l) => `"${l}"`).join(', ')}.
- "summary": 2-4 sentences in plain language in each language, based only on the given text. Do not invent details.
- "whyItMatters": one sentence in each language on the practical impact for a foreigner.
Each of "title", "summary" and "whyItMatters" is an object with all those language keys.
Languages: en = English, de = German (informal "du"), es = Mexican Spanish, fr = French, sv = Swedish.
Do not add facts that are not in the input.`;

function extractJson(text: string): unknown {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object in model output');
  return JSON.parse(text.slice(start, end + 1));
}

function validate(value: unknown): Analysis {
  const v = value as Record<string, unknown>;
  const relevance = Number(v.relevance);
  const category = v.category as Category;
  if (!Number.isFinite(relevance)) throw new Error('relevance is not a number');
  if (!CATEGORIES.includes(category)) throw new Error(`unknown category: ${String(category)}`);

  const translations = (x: unknown): Localized => {
    const p = x as Record<string, unknown> | undefined;
    const out = {} as Localized;
    for (const lang of LANGS) {
      if (typeof p?.[lang] !== 'string') throw new Error(`missing ${lang} translation`);
      out[lang] = p[lang] as string;
    }
    return out;
  };

  return {
    relevance: Math.min(10, Math.max(0, Math.round(relevance))),
    category,
    title: translations(v.title),
    summary: translations(v.summary),
    whyItMatters: translations(v.whyItMatters),
  };
}

export const claudeAnalyzer: Analyzer = {
  async analyze(article: RawArticle): Promise<Analysis> {
    // Created on first use so mock mode never touches the SDK.
    const client = new Anthropic({ apiKey: config.anthropicApiKey });
    const response = await client.messages.create({
      model: config.anthropicModel,
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Source: ${article.source}\nTitle: ${article.title}\nExcerpt: ${article.excerpt}`,
        },
      ],
    });
    const text = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');
    return validate(extractJson(text));
  },
};
