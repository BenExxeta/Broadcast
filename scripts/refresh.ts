/**
 * CLI refresh: `npm run refresh`. Uses the same pipeline as POST /api/refresh.
 * Runs in mock mode unless ANTHROPIC_API_KEY is set in .env.
 */
import { refreshNews } from '../src/lib/pipeline';

refreshNews()
  .then((summary) => {
    console.log(`Refresh complete (${summary.mode} mode)`);
    console.log(`  fetched:   ${summary.fetched}`);
    console.log(`  processed: ${summary.processed} (sent to AI)`);
    console.log(`  cached:    ${summary.cached} (reused, not re-processed)`);
    console.log(`  failed:    ${summary.failed}`);
  })
  .catch((error: unknown) => {
    console.error('Refresh failed:', error);
    process.exit(1);
  });
