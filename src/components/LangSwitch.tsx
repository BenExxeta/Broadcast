import Link from 'next/link';
import { LANGUAGE_OPTIONS } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** One link per language. The /api/lang route sets the cookie and redirects back. */
export function LangSwitch({ lang, path }: { lang: Lang; path: string }) {
  return (
    <nav aria-label="Language of the articles" className="flex flex-wrap gap-1 font-body text-xs">
      {LANGUAGE_OPTIONS.map((o) => {
        const active = o.code === lang;
        return (
          <Link
            key={o.code}
            href={`/api/lang?lang=${o.code}&next=${encodeURIComponent(path)}`}
            title={o.name}
            aria-current={active ? 'true' : undefined}
            className={`border px-2 py-0.5 ${
              active ? 'border-ink bg-ink text-paper' : 'border-ink text-ink hover:bg-paper-dark'
            }`}
          >
            {o.code.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
