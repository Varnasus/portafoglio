# CLAUDE.md

## Project Overview

Portfolio and consulting storefront for Zach Varney / Ranger Ventures LLC. Deployed at zvarney.com via Vercel.

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4 — config lives in `src/app/globals.css` via `@theme inline`, NOT in a tailwind.config file
- PostCSS via `@tailwindcss/postcss` (no autoprefixer — built in)

## Key Architecture Decisions

- **No CMS**: Blog posts are stored as TypeScript objects in `src/lib/posts.ts`. No MDX, no contentlayer.
- **GitHub data**: `src/lib/github.ts` fetches from REST (repos, events) and GraphQL (contributions). ISR revalidation handles caching. Requires `GITHUB_TOKEN` env var for the contribution graph.
- **Split-flap display**: Uses `clackboard` package (our own NPM package). Hero uses `layout="board"` with a 4-row padded structure — a blank margin row on top/bottom and two centered text rows in between, so messages read as if they sit inside a real departure board. Desktop renders 18 columns at `md` size (`STRATEGY_BOARDS_DESKTOP`, `ENGINEERING_BOARDS_DESKTOP`); mobile renders 7 columns at `md` size with its own short-form phrase set (`STRATEGY_BOARDS_MOBILE`, `ENGINEERING_BOARDS_MOBILE`). Both share the `buildBoard` / `centerPad` helpers. Stats use single-row `SplitFlap` with numeric chars. Custom brass palette defined in each component.
- **React Strict Mode is disabled** in `next.config.mjs` (`reactStrictMode: false`) because clackboard has an upstream bug: its `FlapChar` mount effect mutates `ut.current` without resetting it in cleanup, so Strict Mode's double-invoke cancels the initial cascade and only the first character animates. The upstream fix prompt lives at `docs/clackboard-strict-mode-fix-prompt.md`. When the package is patched, remove the flag.
- **Dynamic assets**: OG image (`src/app/opengraph-image.tsx`) and favicon (`src/app/icon.tsx`) are code-generated via Next.js `ImageResponse`. No static image files needed.
- **Service worker**: `public/sw.js` is a **self-destruct** script. A previous version of the site shipped a real page-caching SW, but browsers that visited back then still have it registered. The current file unregisters itself and clears all caches on activate, so anyone who still has the old SW gets a clean slate on their next visit. Do not restore a real SW without a migration plan.

## Project Structure

```
src/
  app/           Pages (App Router)
    blog/        Blog listing + [slug] dynamic route
    work/        Work page (async server component, fetches GitHub data)
    api/         Contact form, CSRF, robots, sitemap
  components/    UI components
    headline.tsx          Split-flap hero (client component)
    github-stats.tsx      Split-flap numeric counters (client component)
    contribution-graph.tsx  GitHub heatmap (client component)
    activity-feed.tsx     Recent GitHub events (server component)
  lib/           Config and data
    site.ts      Site config (branding, nav)
    projects.ts  Curated project cards
    posts.ts     Blog post data
    github.ts    GitHub API fetchers + helpers
```

## Conventions

- Dark theme only (`.dark` class on `<html>`)
- Slate & Brass palette: `--primary: 40 54% 49%` (brass), `--background: 210 14% 7%` (slate)
- Typography: Libre Baskerville (serif headings), Outfit (sans body), JetBrains Mono (mono labels/stats)
- `font-serif` on all headings, `font-mono` for tags, labels, stats — not body text
- Strategy/Engineering view toggle on home page
- Identity framing: "builder/founder", NOT "consultant" or "PM"
- Lytho is a client — do not reference as an employer

## Commands

```bash
npm run dev      # Local dev server
npm run build    # Production build
npm run lint     # ESLint (should be zero errors, zero warnings)
```

## Environment

See `.env.example` for required vars:
- `GITHUB_TOKEN` — personal access token with `read:user`, `public_repo` scope for the contribution graph and repo stats
- `RESEND_API_KEY` — Resend API key for the contact form
