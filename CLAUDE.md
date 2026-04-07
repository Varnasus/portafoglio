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
- **Split-flap display**: Uses `react-split-flap-display` package. CSS override in `globals.css` fixes a `background-clip: text` compositing bug — see the comment there. The ALPHA character set already includes a leading space; do NOT prepend another or the animation loops infinitely.
- **Dynamic assets**: OG image (`src/app/opengraph-image.tsx`) and favicon (`src/app/icon.tsx`) are code-generated via Next.js `ImageResponse`. No static image files needed.
- **Peer deps**: `.npmrc` has `legacy-peer-deps=true` because react-split-flap-display declares React 16-18 as peer dep but works with React 19.

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
- Forest green accent: `--primary: 135 30% 45%` (dark mode)
- JetBrains Mono via `next/font/google` for `font-mono` elements
- `font-mono` used for tags, labels, stats — not body text
- Identity framing: "builder/founder", NOT "consultant" or "PM"
- Lytho is a client — do not reference as an employer

## Commands

```bash
npm run dev      # Local dev server
npm run build    # Production build
npm run lint     # ESLint
```
