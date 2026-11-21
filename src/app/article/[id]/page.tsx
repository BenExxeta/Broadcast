import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Dateline } from '@/components/ArticleCard';
import { DemoBanner } from '@/components/DemoBanner';
import { Masthead } from '@/components/Masthead';
import { RatingForm } from '@/components/RatingForm';
import { ReportButton } from '@/components/ReportButton';
import { SectionLabel } from '@/components/SectionNav';
import { publishedAt } from '@/lib/dates';
import { isMockMode } from '@/lib/config';
import { findArticle } from '@/lib/edition';
import { currentLang } from '@/lib/lang';
import { t } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = findArticle(id);
  if (!article) notFound();

  const lang = await currentLang();
  const txt = t(lang);
  const { analysis } = article;

  return (
    <>
      <Masthead lang={lang} path={`/article/${id}`} compact />
      {isMockMode() && <DemoBanner lang={lang} />}

      <nav className="py-3 text-sm">
        <Link href="/" className="underline">
          {txt.backToEdition}
        </Link>
      </nav>

      <article className="mx-auto mb-10 max-w-2xl border-[3px] border-double border-ink p-5 sm:p-10">
        <SectionLabel category={analysis.category} lang={lang} />
        <h1 className="mt-4 font-display text-4xl leading-tight font-black sm:text-5xl">
          {analysis.title[lang]}
        </h1>
        <p className="mt-3 text-sm text-ink-soft italic">
          {article.title}
        </p>

        {/* Source metadata strip, like the byline line under a printed headline. */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-y border-ink py-2 text-xs tracking-widest uppercase">
          <span>
            {txt.source}: {article.source}
          </span>
          <span>
            {txt.published}: {publishedAt(new Date(article.publishedAt), lang)}
          </span>
          <span>
            {txt.relevance}: {analysis.relevance}/10
          </span>
        </div>

        <div className="mt-6">
          <Dateline article={article} lang={lang} />
        </div>
        <p className="drop-cap mt-3 text-lg leading-relaxed">{analysis.summary[lang]}</p>

        <aside className="my-8 border-2 border-ink bg-paper-dark p-5">
          <h2 className="font-display text-xl font-bold">{txt.whyItMatters}</h2>
          <p className="mt-2 leading-relaxed">{analysis.whyItMatters[lang]}</p>
        </aside>

        <p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 hover:text-accent"
          >
            {txt.readOriginal} ↗
          </a>
        </p>

        {/* Feedback for the success metrics: usefulness rating and inaccuracy report. */}
        <section className="mt-10 space-y-6 border-t-[3px] border-double border-ink pt-6">
          <RatingForm articleId={id} lang={lang} />
          <ReportButton articleId={id} lang={lang} />
        </section>
      </article>
    </>
  );
}
