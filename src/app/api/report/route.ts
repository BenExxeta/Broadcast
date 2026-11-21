import { NextResponse } from 'next/server';
import { findArticle } from '@/lib/edition';
import { store } from '@/lib/store';

/** POST { articleId } to flag an inaccurate summary. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { articleId?: unknown } | null;
  const articleId = typeof body?.articleId === 'string' ? body.articleId : '';

  if (!articleId || !findArticle(articleId)) {
    return NextResponse.json({ error: 'Unknown article' }, { status: 404 });
  }

  store.addReport(articleId);
  return NextResponse.json({ ok: true });
}
