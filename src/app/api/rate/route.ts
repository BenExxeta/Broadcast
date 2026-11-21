import { NextResponse } from 'next/server';
import { findArticle } from '@/lib/edition';
import { store } from '@/lib/store';

/** POST { articleId, score } with score 1-5 for "useful & understandable". */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { articleId?: unknown; score?: unknown } | null;
  const score = Number(body?.score);
  const articleId = typeof body?.articleId === 'string' ? body.articleId : '';

  if (!articleId || !findArticle(articleId)) {
    return NextResponse.json({ error: 'Unknown article' }, { status: 404 });
  }
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return NextResponse.json({ error: 'Score must be 1-5' }, { status: 400 });
  }

  store.addRating(articleId, score);
  return NextResponse.json({ ok: true });
}
