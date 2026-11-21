# Abroadcast

A daily, AI-curated digest of local Guadalajara news for international residents, in German or English. Prototype (v1.0) for a university project.

## Quick start (mock mode, no API key needed)

```bash
npm install
npm run dev          # http://localhost:3000
```

Without `ANTHROPIC_API_KEY` the app runs in **mock mode**: it uses built-in sample articles from fictional demo sources and canned AI output. A banner marks every page as demo content.

To fill the edition from the sample data at any time:

```bash
npm run refresh
```

## Live mode

1. Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`.
2. Run `npm run refresh`. Feeds are fetched, each new article goes through Claude once, and results are cached. Articles already in the cache are not sent again.

Live refresh can also be triggered over HTTP. Set `REFRESH_TOKEN` in `.env`, then:

```bash
curl -X POST -H "Authorization: Bearer $REFRESH_TOKEN" http://localhost:3000/api/refresh
```

Without `REFRESH_TOKEN` the endpoint is disabled.

## Adding or changing news sources

Edit `config/sources.json`. Each entry needs an `id`, a `name` (shown as the source), a `feedUrl` (RSS or Atom), and `enabled`. Other settings in the same file:

- `relevanceThreshold`: articles scoring below this (0–10) are hidden. Default 5.
- `editionWindowHours`: how far back the front page looks. Default 24.
- `ingestWindowHours`: how far back feeds are read. Default 48.
- `excerptChars`: length of the stored excerpt. Full article text is never stored.

Check a feed URL with `curl -I <feedUrl>` before adding it. A feed that fails is logged and skipped, and the rest still refresh.

## Images and credits

Photos live in `public/images/`. They come from Wikimedia Commons and are licensed CC0 or CC BY-SA 4.0. Each photo is labelled "Symbol photo" with its credit and a link to the file page on the article page. Articles without a photo show a placeholder with the section name.

To add a photo to a sample article, set `image` (`src`, `alt`, `credit`, `creditUrl`) in `src/lib/ai/sample-news.ts`. Live articles from RSS do not have photos yet.

## Saved articles and sharing

- "Save" stores the article id in a cookie, so no account is needed. The "Saved" filter shows them.
- "Share on WhatsApp" opens WhatsApp with the title and the article link.

## Daily e-mail digest

- Visitors subscribe on the front page. Consent is required and the address is stored in `data/store.json`.
- `npm run digest` sends each subscriber their top five stories for their topics. Every e-mail has an unsubscribe link.
- Without `RESEND_API_KEY` the script only prints the messages (dry run). To send for real, set `RESEND_API_KEY`, `DIGEST_FROM` (a sender on a domain you have verified with the provider, Resend), and `APP_URL`.
- The digest needs a scheduler (cron, a GitHub Action or a Netlify scheduled function) to run daily. This is not included.
- On Netlify the subscriber list is not persistent (see the deploy notes). Subscribers are lost there until the store is moved to persistent storage.
- Push notifications are not implemented.

## Project layout

```
config/sources.json        feed list and thresholds (edit this)
src/app/                   pages (edition, article, stats) and API routes
src/lib/ai/                analyzer interface, Claude analyzer, mock analyzer, sample data
src/lib/ingest/rss.ts      feed fetching and excerpt cleaning
src/lib/pipeline.ts        refresh: ingest → analyse (cached) → store
src/lib/store.ts           JSON file store in data/store.json
src/lib/edition.ts         what appears on the front page
src/lib/stats.ts           numbers for /stats
scripts/refresh.ts         CLI refresh (npm run refresh)
```

## Feedback and metrics

- Each article has a 1–5 "useful & understandable" rating and a "report inaccurate summary" button.
- Visits are logged once per day per visitor. The stored id is a salted hash that changes daily. Raw IPs and user agents are not stored.
- `/stats` shows visits, unique visitors, average rating, reports, and a per-article table.

## Configuration

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Enables live AI processing. Empty = mock mode. |
| `ANTHROPIC_MODEL` | Model name for the AI step. |
| `MOCK_MODE` | `true` forces mock mode even with a key. |
| `REFRESH_TOKEN` | Enables `POST /api/refresh`. |
| `VISITOR_SALT` | Salt for visitor hashes. Set your own value. |

## Deploy to Netlify

1. Push this repository to GitHub.
2. In Netlify: *Add new site → Import an existing project* and pick the repository. Netlify reads `netlify.toml` and uses `npm run build`.
3. Under *Site configuration → Environment variables*, add what you need:
   - `REFRESH_TOKEN` (required for `POST /api/refresh`)
   - `VISITOR_SALT` (any random string)
   - `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` only if you want live AI processing. Without the key the site runs in mock mode.
4. Deploy. The site stays in mock mode until a key is set.

Netlify runs the app as serverless functions. The JSON store is written to the temp directory, so visit counts, ratings and reports may reset between requests. This is fine for a demo but not for real metrics. For persistent stats, switch the store to Netlify Blobs or a hosted database.

## Known limits (v1.0)

- Storage is a single JSON file, local in `data/`, temporary on Netlify. Not suitable for concurrent writes or persistent metrics.
- Summaries come from the RSS excerpt only, not the full article.
- Mural and Milenio Jalisco feeds were not found, so the live sources are El Informador (Jalisco) and Gaceta UDG.
- Fonts (Playfair Display, Libre Baskerville) are loaded through `next/font/google`, so the first build needs internet access.
- No user accounts, push notifications, other cities, or payments, as per the brief.
