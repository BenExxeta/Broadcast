import { NextResponse, type NextRequest } from 'next/server';
import { parseLang } from '@/lib/i18n';

/** Sets the language cookie, then sends the visitor back to the page they came from. */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = parseLang(searchParams.get('lang'));
  const next = searchParams.get('next') ?? '/';
  // Only allow same-site paths, so this cannot be used as an open redirect.
  const target = next.startsWith('/') && !next.startsWith('//') ? next : '/';

  const response = NextResponse.redirect(new URL(target, request.url));
  response.cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
  return response;
}
