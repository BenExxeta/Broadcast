import Link from 'next/link';
import { Masthead } from '@/components/Masthead';
import { currentLang } from '@/lib/lang';
import { t } from '@/lib/i18n';

/** Landing page: what Abroadcast is, and a button into the setup wizard. */
export default async function WelcomePage() {
  const lang = await currentLang();
  const txt = t(lang);

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
    </>
  );
}
