import { createHash } from 'node:crypto';
import { config } from './config';
import { dayKey } from './dates';
import { store } from './store';

/**
 * Logs one anonymous visit. The raw IP and user agent are never stored: each
 * visitor becomes a salted hash that changes every day, so the same person
 * counts once per day but cannot be tracked across days.
 */
export function recordVisitor(ip: string, userAgent: string, now: Date = new Date()): void {
  const day = dayKey(now);
  const hash = createHash('sha256')
    .update(`${config.visitorSalt}|${day}|${ip}|${userAgent}`)
    .digest('hex')
    .slice(0, 16);
  store.recordVisit(day, hash);
}
