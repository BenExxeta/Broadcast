import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { findArticle } from '@/lib/edition';
import { SAVED_COOKIE, currentSaved, serializeSaved } from '@/lib/saved';

/** POST { articleId, saved } adds or removes an article from the visitor's saved list. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { articleId?: unknown; saved?: unknown } | null;
  const articleId = typeof body?.articleId === 'string' ? body.articleId : '';

  if (!articleId || !findArticle(articleId)) {
    return NextResponse.json({ error: 'Unknown article' }, { status: 404 });
  }
  if (typeof body?.saved !== 'boolean') {
    return NextResponse.json({ error: 'saved must be true or false' }, { status: 400 });
  }

  const current = await currentSaved();
  const next = body.saved
    ? [...new Set([...current, articleId])]
    : current.filter((id) => id !== articleId);

  const response = NextResponse.json({ ok: true, saved: body.saved });
  response.cookies.set(SAVED_COOKIE, serializeSaved(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}
