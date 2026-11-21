import { store } from '@/lib/store';

/** GET /api/unsubscribe?token=… removes the subscriber. The token comes from every digest e-mail. */
export function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const removed = token ? store.removeSubscriber(token) : false;
  return new Response(removed ? 'Unsubscribed. / Abgemeldet.' : 'Unknown link. / Unbekannter Link.', {
    status: removed ? 200 : 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
