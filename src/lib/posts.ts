export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  body: string
}

export const posts: Post[] = [
  {
    slug: "rebuilding-my-portfolio-as-proof-of-work",
    title: "Rebuilding My Portfolio as Proof of Work",
    date: "2026-04-07",
    description:
      "Why I tore down my old portfolio and rebuilt it as a consulting storefront — with live GitHub data, split-flap displays, and zero filler content.",
    tags: ["Next.js", "Claude Code", "Portfolio"],
    body: `This site used to be a product manager's portfolio. Case studies, a timeline, an FAQ page nobody read, and a resume download with placeholder text. It looked like every other PM portfolio on the internet.

I ripped all of it out.

## What changed

The rebuild had one goal: prove that I build things. Not talk about building things — actually ship code that people can see, use, and verify.

Here's what's different:

- **Split-flap display** — The hero uses clackboard, an open-source NPM package I built from scratch. It renders a Vestaboard-style 2-row board with physics-based easing, staggered cascades, and 25 cycling messages.
- **Live GitHub data** — The /work page pulls from the GitHub API. Repo counts, contribution graphs, and recent activity are all real-time, not screenshots.
- **Three project cards** — Each one links to a live repo or a running system. No hypothetical case studies.
- **AI-first build process** — The entire site was built using Claude Code as the primary development tool. Every commit in the git history reflects that workflow.

## The stack

Next.js 15, React 19, Tailwind CSS 4, TypeScript. Deployed on Vercel. No CMS, no analytics dashboard, no unnecessary dependencies.

The previous version had contentlayer, recharts, framer-motion, and a dozen other packages. This version has what it needs and nothing else.

## Why it matters

If you're hiring an AI developer, you want to see code — not slide decks. This site is the code. The GitHub integration is live. The split-flap component is published. The build logs are real.

That's the point.`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
