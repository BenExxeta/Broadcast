import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArticleMeta } from '@/components/ArticleCard';
import { DemoBanner } from '@/components/DemoBanner';
import { Masthead } from '@/components/Masthead';
import { type Filter, SectionLabel, SectionNav } from '@/components/SectionNav';
import { isMockMode } from '@/lib/config';
import { loadEdition } from '@/lib/edition';
import { t } from '@/lib/i18n';
import { currentPrefs } from '@/lib/prefs';
import { store } from '@/lib/store';
import { CATEGORIES } from '@/lib/types';
import { publishedAt } from '@/lib/dates';
import { recordVisitor } from '@/lib/visitors';

// Read the store and cookies on every request so new refreshes show up immediately.
export const dynamic = 'force-dynamic';

function resolveFilter(section: string | undefined): Filter {
  if (section === 'all') return 'all';
  return CATEGORIES.find((c) => c === section) ?? 'mine';
}

/** Front page: one example article in full, then the other headlines with source and date above each. */
export default async function EditionPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const prefs = await currentPrefs();
  if (!prefs) redirect('/welcome');

  const { section } = await searchParams;
  const filter = resolveFilter(section);
  const { lang } = prefs;
  const txt = t(lang);

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0].trim() ?? h.get('x-real-ip') ?? 'local';
  recordVisitor(ip, h.get('user-agent') ?? '');

  const edition = await loadEdition();
  const articles = edition.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'mine') return prefs.topics.length === 0 || prefs.topics.includes(a.analysis.category);
    return a.analysis.category === filter;
  });
  const [lead, ...others] = articles;
  const lastRefresh = store.snapshot().lastRefresh;

  return (
    <>
      <Masthead lang={lang} path="/" />
      {isMockMode() && <DemoBanner lang={lang} />}
      <SectionNav lang={lang} active={filter} />

      {!lead ? (
        <p className="py-12 text-center italic text-ink-soft">{txt.noStories}</p>
      ) : (
        <>
          <section className="border-b border-ink py-8">
            <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{txt.topStory}</p>
            <div className="mt-2">
              <ArticleMeta article={lead} lang={lang} />
            </div>
            <h2 className="mt-2 font-display text-4xl leading-tight font-black sm:text-5xl">
              <Link href={`/article/${lead.id}`} className="hover:underline">
                {lead.analysis.title[lang]}
              </Link>
            </h2>
            <div className="mt-3">
              <SectionLabel category={lead.analysis.category} lang={lang} />
            </div>
            <p className="mt-4 text-lg leading-relaxed">{lead.analysis.summary[lang]}</p>
            <p className="mt-4 border-l-4 border-accent pl-3 text-sm italic">
              <strong className="not-italic">{txt.whyItMatters}:</strong> {lead.analysis.whyItMatters[lang]}
            </p>
            <Link href={`/article/${lead.id}`} className="mt-4 inline-block font-bold underline underline-offset-4">
              {txt.openArticle} →
            </Link>
          </section>

          {others.length > 0 && (
            <section className="pt-6">
              <h2 className="border-b border-ink pb-1 font-display text-2xl font-bold">{txt.moreStories}</h2>
              <ul className="divide-y divide-ink">
                {others.map((a) => (
                  <li key={a.id} className="py-4">
                    <ArticleMeta article={a} lang={lang} />
                    <h3 className="mt-1 font-display text-xl leading-snug font-bold">
                      <Link href={`/article/${a.id}`} className="hover:underline">
                        {a.analysis.title[lang]}
                      </Link>
                    </h3>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <footer className="mt-8 flex flex-wrap justify-between gap-2 border-t border-ink pt-3 text-xs text-ink-soft">
        <span>
          {txt.lastUpdated}: {lastRefresh ? publishedAt(new Date(lastRefresh), lang) : '–'}
        </span>
        <span className="flex gap-4">
          <Link href="/wizard" className="underline">
            {txt.changeSetup}
          </Link>
          <Link href="/stats" className="underline">
            {txt.statsTitle}
          </Link>
        </span>
      </footer>
    </>
  );
}
