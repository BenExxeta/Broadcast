import { NextResponse } from 'next/server';
import { PREFS_COOKIE, serializePrefs, type Prefs } from '@/lib/prefs';
import { CATEGORIES, LANGS, type Category, type Lang } from '@/lib/types';

/** POST { city, lang, topics } from the wizard. Sets the preference cookie and the language cookie. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    city?: unknown;
    lang?: unknown;
    topics?: unknown;
  } | null;

  if (body?.city !== 'guadalajara') {
    return NextResponse.json({ error: 'Unsupported city' }, { status: 400 });
  }
  const lang = LANGS.find((code) => code === body.lang) ?? null;
  if (!lang) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }
  const topics = Array.isArray(body.topics)
    ? body.topics.filter((t): t is Category => CATEGORIES.includes(t as Category))
    : [];

  const prefs: Prefs = { city: 'guadalajara', lang, topics };
  const year = 60 * 60 * 24 * 365;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(PREFS_COOKIE, serializePrefs(prefs), { path: '/', maxAge: year, sameSite: 'lax' });
  response.cookies.set('lang', lang, { path: '/', maxAge: year, sameSite: 'lax' });
  return response;
}
