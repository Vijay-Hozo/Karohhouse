# Karoh House landing page

Marketing site for Karoh House, a Middle Eastern fragrance distribution venture with an AI layer for compliance, discovery and wholesale outreach.

## Stack

- Next.js 16 (App Router) with Bun
- Tailwind CSS v4
- Motion (framer-motion successor) for animations
- Inter via next/font, with pally.com-style tight-tracked headings

## Run

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # production build
```

## Theme

Light and dark themes are driven by CSS variables on `<html data-theme>`. An inline script in
`src/app/layout.tsx` applies the stored or system preference before paint, and the toggle in the
navbar writes `karoh-theme` to localStorage. Palette tokens (blue, cyan, sky on pure black/white)
live in `src/app/globals.css`.

If the theme or styles look stale while developing, restart `bun dev`. Turbopack can keep serving
an old compiled stylesheet after large rewrites of `globals.css`.

## Images

Photos live in `src/assets/images` and are imported statically so `next/image` can size them and
generate blur placeholders. They are Unsplash photos used under the Unsplash licence. Replace them
with brand photography when available.

## Structure

- `src/app/layout.tsx` loads Inter and site metadata
- `src/app/globals.css` holds the palette tokens (oud, sand, cream, gold, amber, plum) and keyframes
- `src/components/` holds one file per section: Navbar, Hero, Stats, Platform, Wholesale, Buyers, Process, Operations, TradeForm, Footer

## Trade-account form

The form posts JSON to `src/app/api/trade-account/route.ts`, which validates the fields, drops
honeypot submissions, and delivers the application:

- If `TRADE_FORM_WEBHOOK_URL` is set (see `.env.example`), the record is POSTed there as JSON.
  Point it at a Zapier/Make webhook, a Google Apps Script writing to a Sheet, Formspree, Slack, or your CRM.
- Otherwise each application is appended to `data/applications.jsonl` (git-ignored). This is the dev fallback.

Validation errors come back per field and are shown inline. Network or delivery failures show a retry message with the fallback email.
