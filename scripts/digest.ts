/**
 * Daily e-mail digest: `npm run digest`.
 * Sends each subscriber their top stories for their topics. Without RESEND_API_KEY
 * it only prints the messages (dry run), so nothing is sent by accident.
 */
import { loadEdition } from '../src/lib/edition';
import { t } from '../src/lib/i18n';
import { publishedAt } from '../src/lib/dates';
import { store } from '../src/lib/store';
import type { Article, Subscriber } from '../src/lib/types';

const APP_URL = process.env.APP_URL ?? 'http://localhost:3000';
const RESEND_KEY = process.env.RESEND_API_KEY ?? '';
const FROM = process.env.DIGEST_FROM ?? 'Abroadcast <onboarding@resend.dev>';
const MAX_ITEMS = 5;

function compose(sub: Subscriber, articles: Article[]): { subject: string; text: string } {
  const txt = t();
  const lines = articles.map(
    (a) =>
      `- ${a.analysis.title[sub.lang]}\n  ${a.source} · ${publishedAt(new Date(a.publishedAt), sub.lang)}\n  ${APP_URL}/article/${a.id}`,
  );
  return {
    subject: `Abroadcast · ${txt.todaysEdition}`,
    text: [
      txt.todaysEdition,
      '',
      ...lines,
      '',
      `${txt.digestUnsubscribe}: ${APP_URL}/api/unsubscribe?token=${sub.token}`,
    ].join('\n'),
  };
}

async function send(to: string, subject: string, text: string): Promise<void> {
  if (!RESEND_KEY) {
    console.log(`[dry run] to ${to}: ${subject}`);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function main(): Promise<void> {
  const subscribers = store.snapshot().subscribers;
  const edition = await loadEdition();
  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const picked = edition
      .filter((a) => sub.topics.length === 0 || sub.topics.includes(a.analysis.category))
      .slice(0, MAX_ITEMS);
    if (picked.length === 0) continue;
    try {
      const message = compose(sub, picked);
      await send(sub.email, message.subject, message.text);
      sent += 1;
    } catch (error) {
      failed += 1;
      console.warn(`[digest] ${sub.email}: ${String(error)}`);
    }
  }

  const mode = RESEND_KEY ? '' : ' (dry run: set RESEND_API_KEY to send)';
  console.log(`Digest: ${subscribers.length} subscribers, ${sent} sent, ${failed} failed${mode}`);
}

main().catch((error: unknown) => {
  console.error('Digest failed:', error);
  process.exit(1);
});
