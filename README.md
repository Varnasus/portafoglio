# zvarney.com

Consulting storefront for Ranger Ventures LLC. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4 (CSS-based `@theme` config), JetBrains Mono
- **Components**: react-split-flap-display, react-activity-calendar
- **APIs**: GitHub REST + GraphQL (ISR revalidation)
- **Deploy**: Vercel at [zvarney.com](https://zvarney.com)

## Pages

- `/` — Home (split-flap hero, services, proof strip)
- `/work` — Contribution graph, stats, featured projects
- `/blog` — Build logs
- `/about` — Bio and stack
- `/contact` — Contact form (Resend email)

## Features

- **Split-flap display**: Cycling headline animation using react-split-flap-display
- **GitHub integration**: Live repo stats, contribution heatmap via GraphQL API
- **Dynamic OG image**: Code-generated social preview card (Next.js ImageResponse)
- **Dynamic favicon**: ZV monogram generated at build time
- **ISR**: GitHub data revalidates hourly (repos) and every 30 min (contributions)

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | Recommended | GitHub PAT for GraphQL contributions + higher rate limits |
| `RESEND_API_KEY` | For contact form | Resend email API key |

## Development

```bash
npm install
npm run dev
```

## Lighthouse Scores

| Category | Score |
|---|---|
| Performance | 95 |
| Accessibility | 96+ |
| Best Practices | 100 |
| SEO | 100 |
