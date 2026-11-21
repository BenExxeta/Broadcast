'use client';

import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** Opens WhatsApp with the article title and its full address, ready to send. */
export function ShareButton({ title, lang, path }: { title: string; lang: Lang; path: string }) {
  function share() {
    const text = `${title}\n${window.location.origin}${path}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <button
      type="button"
      onClick={share}
      className="border border-ink px-3 py-1 text-sm text-ink hover:bg-paper-dark"
    >
      {t(lang).share}
    </button>
  );
}
