import Link from 'next/link';
import { CATEGORIES, type Category, type Lang } from '@/lib/types';
import { categoryLabel, t } from '@/lib/i18n';

/** 'mine' = the visitor's chosen topics, 'all' = everything, or one category. */
export type Filter = 'mine' | 'all' | Category;

/** Filter row under the masthead, styled like a newspaper's section index. Uses ?section= for the filter. */
export function SectionNav({ lang, active }: { lang: Lang; active: Filter }) {
  const txt = t(lang);
  const items: { key: Filter; label: string; href: string }[] = [
    { key: 'mine', label: txt.myTopics, href: '/' },
    { key: 'all', label: txt.allSections, href: '/?section=all' },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: categoryLabel(c, lang),
      href: `/?section=${encodeURIComponent(c)}`,
    })),
  ];
  return (
    <nav aria-label={txt.allSections} className="border-b border-ink py-2">
      <ul className="flex gap-1 overflow-x-auto sm:flex-wrap sm:justify-center">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-2 py-1 text-xs tracking-widest whitespace-nowrap uppercase ${
                  isActive ? 'bg-ink text-paper' : 'text-ink hover:underline'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Small section header used above every article, e.g. "— SAFETY —". */
export function SectionLabel({ category, lang }: { category: Category; lang: Lang }) {
  return (
    <p className="inline-block border-y border-ink px-1 text-xs font-bold tracking-[0.2em] uppercase">
      {categoryLabel(category, lang)}
    </p>
  );
}
