import { NextResponse } from 'next/server';
import { config } from '@/lib/config';
import { refreshNews } from '@/lib/pipeline';

/**
 * POST /api/refresh with header `Authorization: Bearer <REFRESH_TOKEN>`.
 * Disabled unless REFRESH_TOKEN is set, so strangers cannot trigger feed fetches.
 */
export async function POST(request: Request) {
  if (!config.refreshToken) {
    return NextResponse.json({ error: 'REFRESH_TOKEN is not configured' }, { status: 403 });
  }
  if (request.headers.get('authorization') !== `Bearer ${config.refreshToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const summary = await refreshNews();
  return NextResponse.json(summary);
}
