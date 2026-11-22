import { NextResponse, type NextRequest } from 'next/server';
import { parseLang } from '@/lib/i18n';
import { PREFS_COOKIE, parsePrefs, serializePrefs } from '@/lib/prefs';

/**
 * Switches the language of the article content. Sets the language cookie and, if the
 * visitor has completed the wizard, also updates the saved preferences.
 */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = parseLang(searchParams.get('lang'));
  const next = searchParams.get('next') ?? '/';
  // Only allow same-site paths, so this cannot be used as an open redirect.
  const target = next.startsWith('/') && !next.startsWith('//') ? next : '/';
  const year = 60 * 60 * 24 * 365;

  const response = NextResponse.redirect(new URL(target, request.url));
  response.cookies.set('lang', lang, { path: '/', maxAge: year, sameSite: 'lax' });

  const prefs = parsePrefs(request.cookies.get(PREFS_COOKIE)?.value);
  if (prefs) {
    response.cookies.set(PREFS_COOKIE, serializePrefs({ ...prefs, lang }), {
      path: '/',
      maxAge: year,
      sameSite: 'lax',
    });
  }
  return response;
}
