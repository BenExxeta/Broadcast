import type { Lang } from './types';

/** All edition logic uses Guadalajara's time zone, not the server's. */
export const EDITION_TIME_ZONE = 'America/Mexico_City';

/** Calendar day in Guadalajara as YYYY-MM-DD (used as a key for visit counts). */
export function dayKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: EDITION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

const LOCALE: Record<Lang, string> = { en: 'en-GB', de: 'de-DE' };

/** Long date for the masthead, e.g. "Friday, 20 November 2026". */
export function editionDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: EDITION_TIME_ZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Short dateline for articles, e.g. "20 Nov" or "20. Nov.". */
export function shortDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: EDITION_TIME_ZONE,
    day: 'numeric',
    month: 'short',
  }).format(date);
}

/** Date and time for source metadata, e.g. "20 Nov, 14:32". */
export function publishedAt(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: EDITION_TIME_ZONE,
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
