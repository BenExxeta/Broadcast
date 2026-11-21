import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Analysis, Article, RatingEntry, RawArticle, ReportEntry } from './types';

/**
 * Prototype persistence: one JSON file. Locally it lives in data/. On Netlify the
 * project folder is read-only, so the file goes to the temp directory instead.
 * That data is per server instance and can disappear, so it is only good for a demo.
 */
const ON_SERVERLESS = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const STORE_PATH = ON_SERVERLESS
  ? path.join(os.tmpdir(), 'abroadcast-store.json')
  : path.join(process.cwd(), 'data', 'store.json');


interface StoreShape {
  articles: Record<string, Article>;
  /** AI results keyed by article id, so an article is never processed twice. */
  analyses: Record<string, Analysis>;
  ratings: RatingEntry[];
  reports: ReportEntry[];
  /** Per day: total visits and hashed visitor ids (no raw IPs stored). */
  visits: Record<string, { count: number; visitors: string[] }>;
  lastRefresh: string | null;
}

const EMPTY: StoreShape = {
  articles: {},
  analyses: {},
  ratings: [],
  reports: [],
  visits: {},
  lastRefresh: null,
};

export function articleId(url: string): string {
  return createHash('sha1').update(url).digest('hex').slice(0, 12);
}

function read(): StoreShape {
  if (!fs.existsSync(STORE_PATH)) return structuredClone(EMPTY);
  return { ...structuredClone(EMPTY), ...JSON.parse(fs.readFileSync(STORE_PATH, 'utf8')) };
}

function write(store: StoreShape): void {
  fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  // Write to a temp file first, then rename. A reader running at the same time
  // never sees a half-written file (which caused "Unexpected end of JSON input").
  const tmpPath = `${STORE_PATH}.${process.pid}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(store, null, 2), 'utf8');
  fs.renameSync(tmpPath, STORE_PATH);
}

/** Run a read-modify-write cycle against the store file. */
function update<T>(fn: (store: StoreShape) => T): T {
  const store = read();
  const result = fn(store);
  write(store);
  return result;
}

export const store = {
  getAnalysis(id: string): Analysis | undefined {
    return read().analyses[id];
  },

  saveArticle(raw: RawArticle, analysis: Analysis, isSample: boolean): Article {
    return update((s) => {
      const id = articleId(raw.url);
      const article: Article = {
        ...raw,
        id,
        analysis,
        processedAt: new Date().toISOString(),
        isSample,
      };
      s.analyses[id] = analysis;
      s.articles[id] = article;
      return article;
    });
  },

  listArticles(): Article[] {
    return Object.values(read().articles);
  },

  getArticle(id: string): Article | undefined {
    return read().articles[id];
  },

  addRating(articleId: string, score: number): void {
    update((s) => {
      s.ratings.push({ articleId, score, at: new Date().toISOString() });
    });
  },

  addReport(articleId: string): void {
    update((s) => {
      s.reports.push({ articleId, at: new Date().toISOString() });
    });
  },

  /** Records one visit. Each visitor counts once per day, using a salted hash. */
  recordVisit(day: string, visitorHash: string): void {
    update((s) => {
      const entry = (s.visits[day] ??= { count: 0, visitors: [] });
      entry.count += 1;
      if (!entry.visitors.includes(visitorHash)) entry.visitors.push(visitorHash);
    });
  },

  setLastRefresh(iso: string): void {
    update((s) => {
      s.lastRefresh = iso;
    });
  },

  /** Read-only snapshot for the stats page and the home page. */
  snapshot(): StoreShape {
    return read();
  },
};
