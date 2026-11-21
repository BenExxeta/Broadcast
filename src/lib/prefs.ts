import { cookies } from 'next/headers';
import { parseLang } from './i18n';
import { CATEGORIES, type Category, type Lang } from './types';

/** Onboarding answers, stored in a cookie so the visitor does not need an account. */
export interface Prefs {
  city: 'guadalajara';
  lang: Lang;
  topics: Category[];
}

export const PREFS_COOKIE = 'prefs';

/** Parses the cookie value. Returns null if it is missing or invalid, so the visitor sees the wizard. */
export function parsePrefs(raw: string | undefined): Prefs | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<Prefs>;
    if (value.city !== 'guadalajara') return null;
    return {
      city: 'guadalajara',
      lang: parseLang(value.lang),
      topics: (value.topics ?? []).filter((t): t is Category => CATEGORIES.includes(t as Category)),
    };
  } catch {
    return null;
  }
}

export function serializePrefs(prefs: Prefs): string {
  return encodeURIComponent(JSON.stringify(prefs));
}

export async function currentPrefs(): Promise<Prefs | null> {
  const jar = await cookies();
  return parsePrefs(jar.get(PREFS_COOKIE)?.value);
}
