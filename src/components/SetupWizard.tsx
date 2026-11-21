'use client';

import { useState } from 'react';
import { categoryLabel, t } from '@/lib/i18n';
import { CATEGORIES, type Category, type Lang } from '@/lib/types';

const STEPS = 3;

/** Three-step setup: city, language, topics. Saves to /api/prefs, then opens the edition. */
export function SetupWizard({ initialLang }: { initialLang: Lang }) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [topics, setTopics] = useState<Category[]>([]);
  const [busy, setBusy] = useState(false);
  const txt = t(lang);

  function toggleTopic(category: Category) {
    setTopics((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category],
    );
  }

  async function finish() {
    setBusy(true);
    const res = await fetch('/api/prefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'guadalajara', lang, topics }),
    });
    if (res.ok) {
      window.location.assign('/');
    } else {
      setBusy(false);
    }
  }

  const buttonBase = 'border border-ink px-4 py-3 text-left font-display text-lg font-bold transition-colors';
  const selectedClass = 'bg-ink text-paper';
  const idleClass = 'text-ink hover:bg-paper-dark';

  return (
    <section className="mx-auto mt-6 max-w-2xl border-2 border-ink p-5 sm:p-8">
      <p className="text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">
        {step + 1} / {STEPS}
      </p>

      {step === 0 && (
        <div className="mt-4 space-y-4">
          <h2 className="font-display text-3xl font-black">{txt.wizCityTitle}</h2>
          <p className="text-sm text-ink-soft">{txt.wizCityHelp}</p>
          <button
            type="button"
            aria-pressed="true"
            className={`${buttonBase} ${selectedClass} w-full`}
          >
            {txt.wizCityGuadalajara}
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4 space-y-4">
          <h2 className="font-display text-3xl font-black">{txt.wizLangTitle}</h2>
          <p className="text-sm text-ink-soft">{txt.wizLangHelp}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['de', 'en'] as Lang[]).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
                className={`${buttonBase} ${lang === code ? selectedClass : idleClass}`}
              >
                {code === 'de' ? txt.wizLangDe : txt.wizLangEn}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-4">
          <h2 className="font-display text-3xl font-black">{txt.wizTopicsTitle}</h2>
          <p className="text-sm text-ink-soft">{txt.wizTopicsHelp}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CATEGORIES.map((category) => {
              const selected = topics.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleTopic(category)}
                  className={`${buttonBase} ${selected ? selectedClass : idleClass}`}
                >
                  {categoryLabel(category, lang)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-3 py-2 underline disabled:invisible"
        >
          {txt.wizBack}
        </button>
        {step < STEPS - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="border border-ink bg-ink px-5 py-2 font-bold text-paper hover:bg-ink-soft"
          >
            {txt.wizNext}
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            disabled={busy || topics.length === 0}
            className="border border-ink bg-ink px-5 py-2 font-bold text-paper hover:bg-ink-soft disabled:opacity-40"
          >
            {txt.wizFinish}
          </button>
        )}
      </div>
    </section>
  );
}
