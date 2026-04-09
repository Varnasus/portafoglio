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
- **Split-flap display**: Uses `clackboard` package (our own NPM package). Hero uses `layout="board"` for Vestaboard-style 2-row messages with `easing="decelerate"` and staggered cascade. Stats use single-row `SplitFlap` with numeric chars. Custom brass palette defined in each component.
- **Dynamic assets**: OG image (`src/app/opengraph-image.tsx`) and favicon (`src/app/icon.tsx`) are code-generated via Next.js `ImageResponse`. No static image files needed.

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
npm run lint     # ESLint
```
