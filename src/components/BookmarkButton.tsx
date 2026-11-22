'use client';

import { useState } from 'react';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** Toggles an article in the visitor's saved list. Shows the new state right away. */
export function BookmarkButton({ articleId, lang, initialSaved }: { articleId: string; lang: Lang; initialSaved: boolean }) {
  const txt = t();
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = await fetch('/api/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, saved: !saved }),
    });
    setBusy(false);
    if (res.ok) setSaved(!saved);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      className={`border border-ink px-3 py-1 text-sm disabled:opacity-50 ${
        saved ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-dark'
      }`}
    >
      {saved ? `★ ${txt.saved}` : `☆ ${txt.save}`}
    </button>
  );
}
