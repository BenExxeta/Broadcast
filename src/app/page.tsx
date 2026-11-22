import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArticleMeta } from '@/components/ArticleCard';
import { ArticleImage } from '@/components/ArticleImage';
import { BookmarkButton } from '@/components/BookmarkButton';
import { DemoBanner } from '@/components/DemoBanner';
import { EmailSignup } from '@/components/EmailSignup';
import { Masthead } from '@/components/Masthead';
import { SectionNav, type Filter } from '@/components/SectionNav';
import { ShareButton } from '@/components/ShareButton';
import { CATEGORY_IMAGES } from '@/lib/category-images';
import { config, isMockMode } from '@/lib/config';
import { publishedAt } from '@/lib/dates';
import { loadEdition } from '@/lib/edition';
import { categoryLabel, t } from '@/lib/i18n';
import { currentPrefs } from '@/lib/prefs';
import { currentSaved } from '@/lib/saved';
import { store } from '@/lib/store';
import { CATEGORIES, type Article, type Category, type Lang } from '@/lib/types';
import { recordVisitor } from '@/lib/visitors';

// Read the store and cookies on every request so new refreshes show up immediately.
export const dynamic = 'force-dynamic';

function resolveFilter(section: string | undefined): Filter {
  if (section === 'all' || section === 'saved') return section;
  return CATEGORIES.find((c) => c === section) ?? 'mine';
}

async function selectArticles(filter: Filter, topics: Category[], saved: string[]): Promise<Article[]> {
  if (filter === 'saved') {
    return store
      .listArticles()
      .filter((a) => saved.includes(a.id))
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  }
  const edition = await loadEdition();
  return edition.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'mine') return topics.length === 0 || topics.includes(a.analysis.category);
    return a.analysis.category === filter;
  });
}

/** Articles grouped by section, in the order of CATEGORIES. Empty sections are left out. */
function groupBySection(articles: Article[]): { category: Category; items: Article[] }[] {
  return CATEGORIES.flatMap((category) => {
    const items = articles.filter((a) => a.analysis.category === category);
    return items.length > 0 ? [{ category, items }] : [];
  });
}

/** One headline in a section, with its small section picture on the left. Summary opens on click. */
function StoryItem({ article, lang, isSaved }: { article: Article; lang: Lang; isSaved: boolean }) {
  const txt = t();
  const { analysis } = article;
  const picture = CATEGORY_IMAGES[analysis.category];
  return (
    <li className="py-4">
      <details>
        <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
          <div className="w-24 shrink-0 sm:w-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={picture.src}
              alt={picture.alt}
              loading="lazy"
              className="aspect-[4/3] w-full border border-ink object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <ArticleMeta article={article} lang={lang} />
            <h3 className="mt-1 font-display text-xl leading-snug font-bold">{analysis.title[lang]}</h3>
            <p className="mt-1 text-xs italic text-ink-soft">
              {txt.originalHeadline}: {article.title}
            </p>
          </div>
        </summary>

        <div className="mt-4 space-y-4">
          <p className="leading-relaxed">{analysis.summary[lang]}</p>
          <p className="border-l-4 border-accent pl-3 text-sm italic">
            <strong className="not-italic">{txt.whyItMatters}:</strong> {analysis.whyItMatters[lang]}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/article/${article.id}`} className="font-bold underline underline-offset-4">
              {txt.openArticle} →
            </Link>
            <BookmarkButton articleId={article.id} lang={lang} initialSaved={isSaved} />
            <ShareButton title={analysis.title[lang]} lang={lang} path={`/article/${article.id}`} />
          </div>
        </div>
      </details>
    </li>
  );
}

/** Front page: one block per section with its picture, heading and headlines. */
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
  const txt = t();

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0].trim() ?? h.get('x-real-ip') ?? 'local';
  recordVisitor(ip, h.get('user-agent') ?? '');

  const saved = await currentSaved();
  const articles = await selectArticles(filter, prefs.topics, saved);
  const [lead, ...rest] = articles;
  const showLead = config.leadStory && lead;
  const listed = showLead ? rest : articles;
  const sections = groupBySection(listed);
  const lastRefresh = store.snapshot().lastRefresh;

  return (
    <>
      <Masthead lang={lang} path="/" />
      {isMockMode() && <DemoBanner lang={lang} />}
      <SectionNav lang={lang} active={filter} />

      {articles.length === 0 ? (
        <p className="py-12 text-center italic text-ink-soft">
          {filter === 'saved' ? txt.noSaved : txt.noStories}
        </p>
      ) : (
        <>
          {showLead && (
            <section className="border-b border-ink pb-6 pt-6">
              <ArticleImage article={lead} lang={lang} />
              <ArticleMeta article={lead} lang={lang} />
              <h2 className="mt-2 font-display text-4xl leading-tight font-black sm:text-5xl">
                <Link href={`/article/${lead.id}`} className="hover:underline">
                  {lead.analysis.title[lang]}
                </Link>
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{lead.analysis.summary[lang]}</p>
            </section>
          )}

          {sections.map(({ category, items }) => (
            <section key={category} className="border-t-[3px] border-double border-ink py-6">
              <h2 className="text-center font-display text-3xl font-black tracking-wide uppercase">
                {categoryLabel(category)}
              </h2>
              <ul className="mt-2 divide-y divide-ink">
                {items.map((a) => (
                  <StoryItem key={a.id} article={a} lang={lang} isSaved={saved.includes(a.id)} />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}

      <EmailSignup lang={lang} topics={prefs.topics} />

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
