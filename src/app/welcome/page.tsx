import Link from 'next/link';
import { ArticleMeta } from '@/components/ArticleCard';
import { Masthead } from '@/components/Masthead';
import { loadEdition } from '@/lib/edition';
import { currentLang } from '@/lib/lang';
import { t } from '@/lib/i18n';

/** Landing page: what Abroadcast is, a few current headlines, and the button into the wizard. */
export default async function WelcomePage() {
  const lang = await currentLang();
  const txt = t(lang);
  const preview = (await loadEdition()).slice(0, 3);

  return (
    <>
      <Masthead lang={lang} path="/welcome" />
      <section className="mx-auto mt-8 max-w-2xl space-y-8 text-center">
        <p className="text-lg leading-relaxed">{txt.welcomeText}</p>
        <Link
          href="/wizard"
          className="inline-block border-2 border-ink bg-ink px-8 py-3 font-display text-xl font-bold text-paper hover:bg-ink-soft"
        >
          {txt.tryOut} →
        </Link>
      </section>

      {preview.length > 0 && (
        <section className="mx-auto mt-12 max-w-2xl border-t-[3px] border-double border-ink pt-6">
          <h2 className="font-display text-2xl font-bold">{txt.previewTitle}</h2>
          <ul className="mt-4 divide-y divide-ink">
            {preview.map((a) => (
              <li key={a.id} className="py-3">
                <ArticleMeta article={a} lang={lang} />
                <p className="mt-1 font-display text-lg font-bold">
                  <Link href={`/article/${a.id}`} className="hover:underline">
                    {a.analysis.title[lang]}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
