'use client';

import { useState, type FormEvent } from 'react';
import { t } from '@/lib/i18n';
import type { Category, Lang } from '@/lib/types';

/** Asks for an e-mail address and explicit consent, then posts to /api/subscribe. */
export function EmailSignup({ lang, topics }: { lang: Lang; topics: Category[] }) {
  const txt = t(lang);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'done' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, consent, lang, topics }),
    });
    setStatus(res.ok ? 'done' : 'error');
  }

  return (
    <section className="mt-10 border-t-[3px] border-double border-ink pt-6">
      <h2 className="font-display text-2xl font-bold">{txt.subscribeTitle}</h2>
      <p className="mt-1 text-sm text-ink-soft">{txt.subscribeText}</p>

      {status === 'done' ? (
        <p role="status" className="mt-4 italic">{txt.subscribeDone}</p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="sr-only">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-ink bg-paper px-3 py-2"
            />
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <span>{txt.subscribeConsent}</span>
          </label>
          <button
            type="submit"
            disabled={!consent}
            className="border border-ink bg-ink px-5 py-2 font-bold text-paper hover:bg-ink-soft disabled:opacity-40"
          >
            {txt.subscribeButton}
          </button>
          {status === 'error' && (
            <p role="alert" className="text-sm text-accent">{txt.subscribeError}</p>
          )}
        </form>
      )}
    </section>
  );
}
