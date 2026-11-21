import Link from 'next/link';
import type { Lang } from '@/lib/types';

/** Two plain links. The /api/lang route sets the cookie and redirects back. */
export function LangSwitch({ lang, path }: { lang: Lang; path: string }) {
  const options: { code: Lang; label: string }[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
  ];
  return (
    <nav aria-label="Language" className="flex gap-1 font-body text-xs">
      {options.map((o) => {
        const active = o.code === lang;
        return (
          <Link
            key={o.code}
            href={`/api/lang?lang=${o.code}&next=${encodeURIComponent(path)}`}
            aria-current={active ? 'true' : undefined}
            className={`border px-2 py-0.5 ${
              active ? 'border-ink bg-ink text-paper' : 'border-ink text-ink hover:bg-paper-dark'
            }`}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}
