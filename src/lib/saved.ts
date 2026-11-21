import { cookies } from 'next/headers';

/** Saved articles live in a cookie, so no account is needed. Only the article ids are stored. */
export const SAVED_COOKIE = 'saved';

const ARTICLE_ID = /^[a-f0-9]{12}$/;

export function parseSaved(raw: string | undefined): string[] {
  if (!raw) return [];
  return decodeURIComponent(raw)
    .split(',')
    .filter((id) => ARTICLE_ID.test(id));
}

export function serializeSaved(ids: string[]): string {
  return encodeURIComponent(ids.join(','));
}

export async function currentSaved(): Promise<string[]> {
  const jar = await cookies();
  return parseSaved(jar.get(SAVED_COOKIE)?.value);
}
