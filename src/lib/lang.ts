import { cookies } from 'next/headers';
import { parseLang } from './i18n';
import { PREFS_COOKIE, parsePrefs } from './prefs';
import type { Lang } from './types';

/** Language of the article content: the one chosen in the wizard, else the language cookie, else English. */
export async function currentLang(): Promise<Lang> {
  const jar = await cookies();
  return parsePrefs(jar.get(PREFS_COOKIE)?.value)?.lang ?? parseLang(jar.get('lang')?.value);
}
