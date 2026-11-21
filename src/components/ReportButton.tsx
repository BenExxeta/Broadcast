'use client';

import { useState } from 'react';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

/** "Report inaccurate summary" button. One report per click, then a confirmation. */
export function ReportButton({ articleId, lang }: { articleId: string; lang: Lang }) {
  const txt = t(lang);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function report() {
    setBusy(true);
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId }),
    });
    setBusy(false);
    if (res.ok) setDone(true);
  }

  if (done) {
    return <p role="status" className="text-sm italic">{txt.reportDone}</p>;
  }
  return (
    <button
      type="button"
      onClick={report}
      disabled={busy}
      className="text-sm underline decoration-accent underline-offset-4 text-accent hover:bg-paper-dark disabled:opacity-50"
    >
      {txt.reportButton}
    </button>
  );
}
