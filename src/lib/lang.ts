import { cookies } from 'next/headers';
import { parseLang } from './i18n';
import type { Lang } from './types';

/** Reads the language the visitor picked (stored in a cookie). Defaults to English. */
export async function currentLang(): Promise<Lang> {
  const jar = await cookies();
  return parseLang(jar.get('lang')?.value);
}
