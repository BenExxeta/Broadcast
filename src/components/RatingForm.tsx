'use client';

import { useState } from 'react';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** Five-step usefulness rating. Posts to /api/rate and then shows a thank-you note. */
export function RatingForm({ articleId, lang }: { articleId: string; lang: Lang }) {
  const txt = t();
  const [score, setScore] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  async function rate(value: number) {
    setBusy(true);
    const res = await fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, score: value }),
    });
    setBusy(false);
    if (res.ok) setScore(value);
  }

  return (
    <fieldset className="border-t border-ink pt-3">
      <legend className="text-sm font-bold">{txt.rateTitle}</legend>
      {score ? (
        <p role="status" className="mt-2 text-sm italic">{txt.rateDone}</p>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-2" role="group" aria-label={txt.rateLabel}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              disabled={busy}
              onClick={() => rate(value)}
              aria-label={`${value} / 5`}
              className="h-10 w-10 border border-ink font-display text-lg font-bold hover:bg-ink hover:text-paper disabled:opacity-50"
            >
              {value}
            </button>
          ))}
          <span className="text-xs text-ink-soft">{txt.rateLabel}</span>
        </div>
      )}
    </fieldset>
  );
}
