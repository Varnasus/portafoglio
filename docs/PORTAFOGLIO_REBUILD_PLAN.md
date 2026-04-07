# Portafoglio Rebuild — Execution Plan

**Site:** zvarney.com
**Identity:** Zach Varney / Ranger Ventures LLC — AI builder for hire
**Stack:** Next.js 15, React 19, Tailwind CSS 4, Framer Motion, clackboard (split-flap)
**GitHub:** github.com/Varnasus

---

## Claude Code Execution Notes

**Run one phase at a time.** Prompt Claude Code with the specific phase (e.g. "Execute Phase 1 from PORTAFOGLIO_REBUILD_PLAN.md"). Verify the build passes before moving to the next phase.

**Phase prompting pattern:**
1. Start each phase with: "Read PORTAFOGLIO_REBUILD_PLAN.md Phase X. Execute all tasks in order. Run `npm run build` when done and fix any errors."
2. Review the diff before committing
3. If Claude Code proposes something that deviates from the plan, pause and decide — it may have a better idea or it may be hallucinating a dependency

**Important context for Claude Code:**
- The repo uses Next.js App Router (not Pages Router)
- Tailwind CSS 4 (not v3 — config syntax differs)
- `clackboard` is the NPM package name, not `split-flap-display` (the repo name differs from the package name)
- Contentlayer is used for MDX blog posts — keep this wiring intact even when deleting post content
- The project may have a `CLAUDE.md` already — update it rather than replacing it, or merge this plan's guidance into it

**After each phase, commit with a descriptive message:**
```bash
git add -A && git commit -m "Phase X: [description]"
```

---

## Phase 1 — Strip & Re-Foundation

**Goal:** Remove dead weight, update identity layer, get a clean build with no zombie pages.

### 1.1 Delete pages & routes
- `src/app/case-studies/` — entire directory
- `src/app/timeline/` — entire directory
- `src/app/tools/` — entire directory (ROI calculator, discovery canvas)
- Remove any content files: `content/case-studies/` MDX files
- **Update Contentlayer config** (`contentlayer.config.ts` or similar) — remove the `CaseStudy` document type definition, keep `Post` for blog
- Clean up `.contentlayer/generated/` — delete `CaseStudy/` generated files (or just delete the whole `.contentlayer/` dir and let it regenerate)
- Keep `src/app/blog/` infrastructure (empty it of old posts, keep the routing)
- Keep `src/app/about/` (will rewrite in Phase 4)
- Keep `src/app/` root (homepage, will rebuild in Phase 2)

### 1.2 Clean up components
- Delete `src/components/tools/` directory
- Delete any case-study-specific components
- Delete `src/components/social-sharing.tsx` (rebuild later if needed)
- Keep `src/components/ui/` base components
- Keep `src/components/header.tsx` and `src/components/footer.tsx` (will rework)

### 1.3 Update site identity
**`src/lib/site.ts`** (or wherever `siteConfig` lives):
```ts
export const siteConfig = {
  name: "Zach Varney",
  title: "Zach Varney — AI Builder & Founder of Ranger Ventures",
  description: "I build AI-powered tools and ship production code. Contracting, consulting, and hands-on development for teams that need AI done right.",
  url: "https://zvarney.com",
  ogImage: "/og-image.jpg", // will need a new one
  author: {
    name: "Zach Varney",
    company: "Ranger Ventures LLC",
    github: "https://github.com/Varnasus",
    linkedin: "https://www.linkedin.com/in/zach-varney/",
    email: "z.varney.business@gmail.com",
  },
}
```

### 1.4 Update schema.org (`src/components/schema.tsx`)
- `PersonSchema`: Change role from "AI Technical Product Manager" to something like "AI Developer & Founder"
- `OrganizationSchema`: Update description to reflect contracting/building, not portfolio showcase
- Remove any schema types you're not using (FAQ, SoftwareApplication if unused)
- Update `sameAs` links to correct GitHub (Varnasus)

### 1.5 Update layout metadata (`src/app/layout.tsx`)
- Rewrite keywords: drop "Product Management", add "AI development", "AI contracting", "code shipping", "NPM packages", etc.
- Update OG/Twitter descriptions
- Remove references to case studies, tools, timeline in meta

### 1.6 Update nav (`header.tsx`)
New nav structure:
- **Home** (/)
- **Work** (/work) — this will be the GitHub/projects showcase
- **Blog** (/blog) — build logs
- **About** (/about)
- **Contact** (/contact)

### 1.7 Verify clean build
```bash
npm run build
```
Fix any broken imports, dead references, 404 routes. This phase is done when the site builds clean with just the skeleton pages.

---

## Phase 2 — Hero & Homepage Identity

**Goal:** First impression that says "this person builds things" — not "this person manages things."

### 2.1 Install clackboard
```bash
npm install clackboard
```

Add JetBrains Mono font to layout if not already present:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### 2.2 Hero section component
Create `src/components/hero.tsx`:

```tsx
"use client"
import { SplitFlap, useCyclingMessages } from "clackboard"

const HEADLINES = [
  "AI SOLUTIONS",
  "SHIPPING CODE",
  "YOUR NEXT BUILDER",
  "NPM PACKAGES",
  "OPEN SOURCE",
]

export function Hero() {
  const message = useCyclingMessages(HEADLINES, 4)
  
  return (
    <section className="...">
      <SplitFlap
        value={message}
        length={16}
        size="xl"
        color="ranger"
        mode="board"
        sound={false}
        variant="classic"
      />
      {/* Subheadline + CTA below */}
    </section>
  )
}
```

Tune the `length`, `size`, and messages to fit your viewport. Test mobile — `size="lg"` or `size="md"` on smaller screens.

### 2.3 Homepage structure
```
[Hero — split-flap cycling headlines]
[One-liner: who I am, what I build, CTA button]
[Proof of Work section — Phase 3 placeholder]
[Services snapshot — Phase 4 placeholder]  
[Contact CTA]
```

### 2.4 Design direction
- Dark background (the `ranger` theme's dark forest green works well)
- JetBrains Mono for headers/code elements, clean sans-serif for body
- Minimal color palette: dark bg, green accent (from ranger theme), white text
- The split-flap IS the design language — let it anchor the visual identity

---

## Phase 3 — Proof of Work (GitHub Integration)

**Goal:** Live, dynamic proof that you ship code. This is the centerpiece.

### 3.1 GitHub API integration

**Note for Claude Code:** Claude Code cannot make live API calls to github.com. It should write the integration code and types, but you'll need to test the actual API responses locally with `npm run dev`. Have your `.env.local` ready with `GITHUB_TOKEN` before testing.

Create `src/lib/github.ts`:

Use the GitHub REST API (no auth needed for public repos, but add a PAT for higher rate limits):

```ts
const GITHUB_USERNAME = "Varnasus"
const GITHUB_API = "https://api.github.com"

// Fetch public repos sorted by recent push
export async function getRepos() {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=public`,
    { next: { revalidate: 3600 } } // ISR: refresh hourly
  )
  return res.json()
}

// Fetch recent events (commits, PRs, etc.)
export async function getActivity() {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    { next: { revalidate: 1800 } }
  )
  return res.json()
}

// Fetch contribution stats for a specific repo
export async function getRepoStats(repo: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}`,
    { next: { revalidate: 3600 } }
  )
  return res.json()
}
```

### 3.2 Featured projects component
Create `src/components/featured-projects.tsx`:

A grid of project cards. Each card shows:
- Repo name
- Description
- Language
- Stars / forks (use split-flap counters that animate on scroll)
- Last pushed date
- Link to repo

**Pinned/featured repos** (curate these — don't just show all 11):
- `split-flap-display` (clackboard) — your NPM package
- `Portafoglio` — this very site (meta, but proves the point)
- Ghost Writer agent (when ready)
- Any other public repos worth showing

### 3.3 Activity feed component
Create `src/components/activity-feed.tsx`:

A compact feed showing recent GitHub events:
- "Pushed 3 commits to split-flap-display" — 2 hours ago
- "Opened PR #12 on Portafoglio" — yesterday

Keep it to 5-8 recent items. This is the "alive" signal.

### 3.4 Stats bar with split-flap counters
Use `<SplitFlap>` with `NUMERIC_CHARS` and `animateOnMount` for key stats:
- Total public repos
- Total commits (this month or all time)
- NPM downloads (if you can get clackboard download stats)
- Days since last commit (keep this one honest — it's motivating)

Wrap in an IntersectionObserver so they animate when scrolled into view (see the scroll trigger example in clackboard docs).

### 3.5 Create the /work page
`src/app/work/page.tsx` — full showcase page with:
- Featured projects grid (3.2)
- Activity feed (3.3)  
- Stats bar (3.4)
- Optional: contribution heatmap (there are React components for this, or build a simple one)

Also embed a condensed version on the homepage.

---

## Phase 4 — Services, About & Contact

### 4.1 Services section (homepage)
Keep it tight. 3 cards max:
- **AI Development** — Custom AI tools, agents, integrations
- **Technical Consulting** — Architecture, strategy, implementation planning
- **Open Source** — NPM packages, public tools, community contributions

Each card gets a split-flap header that flips in on scroll.

### 4.2 About page rewrite (`src/app/about/page.tsx`)
Kill the PM narrative. New story:
- Builder who ships code
- Founder of Ranger Ventures
- Transitioned from PM to hands-on AI development
- Tools you use daily (Claude Code, Cursor, etc.)
- Based in KC

### 4.3 Contact simplification
Strip the multi-step form. Replace with:
- Simple name / email / message form
- Direct email link
- Calendly embed or link (if you use it)
- GitHub and LinkedIn links

---

## Phase 5 — Blog Reframe & Polish

### 5.1 Blog infrastructure
- Keep Contentlayer + MDX setup
- Delete all existing posts
- Create first post template for "build log" format:
  - Short (500-800 words)
  - Code snippets
  - What was built, why, what was learned
  
### 5.2 Seed posts (write when ready)
- "Building clackboard: An NPM Split-Flap Display"
- "Rebuilding My Portfolio as Proof of Work"
- "Ghost Writer: An AI Agent for Content Generation" (when shipped)

### 5.3 Split-flap section headers
Add `<SplitFlap>` elements to section headers throughout the site:
- Section titles that flip in on scroll
- Stats that count up
- Keep it tasteful — hero + section headers + stats bar, not every heading

### 5.4 Final polish
- New OG image (dark, split-flap aesthetic)
- Responsive pass (test split-flap sizing on mobile)
- Lighthouse audit (performance, accessibility, SEO)
- Update robots.txt and sitemap for new routes
- Deploy to Vercel

---

## Execution Order

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
  (1 day)   (1 day)   (2 days)  (1 day)   (ongoing)
```

Phase 1-2 gets you a deployable site fast. Phase 3 is the big differentiator. Phase 4-5 rounds it out.

---

## Key Dependencies
- `clackboard` (NPM) — split-flap display
- GitHub REST API — no auth for public, PAT recommended
- JetBrains Mono — Google Fonts
- Existing: Next.js 15, React 19, Tailwind CSS 4, Framer Motion

## GitHub PAT Setup (for higher rate limits)
1. GitHub → Settings → Developer Settings → Personal Access Tokens
2. Create a fine-grained token with **public_repo read** only
3. Add to `.env.local` as `GITHUB_TOKEN`
4. Pass as `Authorization: Bearer ${process.env.GITHUB_TOKEN}` header in API calls
