import Link from 'next/link';
import { DemoBanner } from '@/components/DemoBanner';
import { Masthead } from '@/components/Masthead';
import { isMockMode } from '@/lib/config';
import { dayKey, publishedAt } from '@/lib/dates';
import { currentLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import { computeStats } from '@/lib/stats';

export const dynamic = 'force-dynamic';

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-ink p-4 text-center">
      <p className="font-display text-4xl font-black">{value}</p>
      <p className="mt-1 text-xs tracking-widest uppercase text-ink-soft">{label}</p>
    </div>
  );
}

export default async function StatsPage() {
  const lang = await currentLang();
  const txt = t();
  const stats = computeStats();
  const fmt = (n: number | null) => (n === null ? '–' : n.toFixed(1));

  return (
    <>
      <Masthead lang={lang} path="/stats" compact />
      {isMockMode() && <DemoBanner lang={lang} />}

      <nav className="py-3 text-sm">
        <Link href="/" className="underline">
          {txt.backToEdition}
        </Link>
      </nav>

      <h1 className="font-display text-4xl font-black">{txt.statsTitle}</h1>
      <p className="mt-1 text-xs text-ink-soft">
        {txt.lastUpdated}: {stats.lastRefresh ? publishedAt(new Date(stats.lastRefresh), lang) : '–'}
      </p>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Tile label={txt.visitsToday} value={stats.visitsToday} />
        <Tile label={txt.uniqueToday} value={stats.uniqueToday} />
        <Tile label={txt.visitsTotal} value={stats.visitsTotal} />
        <Tile label={txt.avgRating} value={fmt(stats.avgRating)} />
        <Tile label={txt.ratingsCount} value={stats.ratingCount} />
        <Tile label={txt.reportsCount} value={stats.reportCount} />
      </section>

      <section className="mt-10">
        <h2 className="border-b border-ink pb-1 font-display text-2xl font-bold">{txt.byDay}</h2>
        {stats.byDay.length === 0 ? (
          <p className="mt-3 italic text-ink-soft">{txt.noData}</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead className="text-xs tracking-widest uppercase">
              <tr>
                <th className="py-1">{txt.dayHeader}</th>
                <th className="py-1 text-right">{txt.visitsToday}</th>
                <th className="py-1 text-right">{txt.uniqueToday}</th>
              </tr>
            </thead>
            <tbody>
              {stats.byDay.slice(0, 14).map((d) => (
                <tr key={d.day} className="border-t border-ink/30">
                  <td className="py-1">{d.day === dayKey() ? `${d.day} ·` : d.day}</td>
                  <td className="py-1 text-right">{d.visits}</td>
                  <td className="py-1 text-right">{d.unique}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mt-10">
        <h2 className="border-b border-ink pb-1 font-display text-2xl font-bold">{txt.perArticle}</h2>
        {stats.perArticle.length === 0 ? (
          <p className="mt-3 italic text-ink-soft">{txt.noData}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-3 w-full text-left text-sm">
              <thead className="text-xs tracking-widest uppercase">
                <tr>
                  <th className="py-1">{txt.articlesHeader}</th>
                  <th className="py-1 text-right">{txt.ratingsHeader}</th>
                  <th className="py-1 text-right">{txt.ratingsCount}</th>
                  <th className="py-1 text-right">{txt.reportsHeader}</th>
                </tr>
              </thead>
              <tbody>
                {stats.perArticle.map((row) => (
                  <tr key={row.article.id} className="border-t border-ink/30 align-top">
                    <td className="py-2 pr-3">
                      <Link href={`/article/${row.article.id}`} className="hover:underline">
                        {row.article.analysis.title[lang]}
                      </Link>
                    </td>
                    <td className="py-2 text-right">{fmt(row.avgRating)}</td>
                    <td className="py-2 text-right">{row.ratings}</td>
                    <td className="py-2 text-right">{row.reports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
