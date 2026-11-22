import Link from 'next/link';
import { editionDate, shortDate } from '@/lib/dates';
import { LANGUAGE_OPTIONS, t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';
import { LangSwitch } from './LangSwitch';

/** Classic masthead: date line, big nameplate, double rule. `compact` shrinks it for article pages. */
export function Masthead({ lang, path, compact = false }: { lang: Lang; path: string; compact?: boolean }) {
  const txt = t();
  const now = new Date();
  const languageName = LANGUAGE_OPTIONS.find((o) => o.code === lang)?.name ?? 'English';
  return (
    <header className="border-b-[3px] border-double border-ink pt-4 pb-3 text-center">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink pb-1 text-xs tracking-widest text-ink-soft uppercase">
        <span>{editionDate(now, 'en')}</span>
        <LangSwitch lang={lang} path={path} />
      </div>
      <Link href="/" className="mt-3 block font-display leading-none font-black tracking-tight">
        <span className={compact ? 'text-4xl' : 'text-5xl sm:text-7xl'}>{txt.siteName}</span>
      </Link>
      <p className="mt-2 text-sm italic text-ink-soft">
        {txt.edition} · {languageName} · {shortDate(now, 'en')}
      </p>
    </header>
  );
}
