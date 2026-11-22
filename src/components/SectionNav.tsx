import Link from 'next/link';
import { categoryLabel, t } from '@/lib/i18n';
import { CATEGORIES, type Category, type Lang } from '@/lib/types';

/** 'mine' = the visitor's chosen topics, 'all' = everything, 'saved' = bookmarks, or one category. */
export type Filter = 'mine' | 'all' | 'saved' | Category;

/** Filter row under the masthead. One line that scrolls sideways on every screen size. */
export function SectionNav({ lang, active }: { lang: Lang; active: Filter }) {
  const txt = t();
  const items: { key: Filter; label: string; href: string }[] = [
    { key: 'mine', label: txt.myTopics, href: '/' },
    { key: 'all', label: txt.allSections, href: '/?section=all' },
    { key: 'saved', label: txt.savedTopics, href: '/?section=saved' },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: categoryLabel(c),
      href: `/?section=${encodeURIComponent(c)}`,
    })),
  ];
  return (
    <nav aria-label={txt.allSections} className="border-b border-ink py-2">
      <ul className="flex w-full justify-between gap-2 overflow-x-auto sm:gap-4">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key} className="shrink-0">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-3 py-2 text-sm tracking-widest whitespace-nowrap uppercase ${
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
      {categoryLabel(category)}
    </p>
  );
}
