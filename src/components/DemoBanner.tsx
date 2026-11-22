import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** Shown on every page in mock mode so nobody mistakes sample content for live news. */
export function DemoBanner({ lang }: { lang: Lang }) {
  return (
    <p role="status" className="my-3 border border-accent bg-paper-dark px-3 py-2 text-center text-sm text-accent">
      {t().sampleBanner}
    </p>
  );
}
