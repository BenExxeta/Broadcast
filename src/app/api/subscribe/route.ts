import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { parseLang } from '@/lib/i18n';
import { store } from '@/lib/store';
import { CATEGORIES, type Category } from '@/lib/types';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST { email, consent, lang, topics }. Consent must be true; the address is stored for the digest. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    consent?: unknown;
    lang?: unknown;
    topics?: unknown;
  } | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!EMAIL.test(email) || body?.consent !== true) {
    return NextResponse.json({ error: 'Invalid email or missing consent' }, { status: 400 });
  }

  const topics = Array.isArray(body.topics)
    ? body.topics.filter((t): t is Category => CATEGORIES.includes(t as Category))
    : [];

  store.addSubscriber({
    email,
    lang: parseLang(typeof body.lang === 'string' ? body.lang : null),
    topics,
    token: randomBytes(16).toString('hex'),
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
