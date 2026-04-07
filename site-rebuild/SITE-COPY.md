# zvarney.com — Complete Rebuild Plan

## Site Structure

```
/ (Home)
/work
/about
/contact
```

All other pages (FAQ, Timeline, Resume, Tools, Case Studies, Blog) → redirect to `/` or remove entirely.

---

## PAGE 1: HOME (/)

### Above the fold

**Eyebrow (small text above headline):**
Ranger Ventures LLC

**Headline (this is where the split-flap display lives):**
I build AI systems that ship to production.

> NOTE: The split-flap animates this headline in on page load. After initial display,
> it can optionally cycle to a second line like "RANGER VENTURES" or stay static.
> Test both — static might be more professional for consulting prospects.

**Subhead:**
AI consulting & development for B2B SaaS companies. I design middleware, integrations, and intelligent workflows — then I build them.

**CTA buttons:**
- Primary: "Start a Conversation" → /contact
- Secondary: "See My Work →" → /work

### What I Do (three columns)

**Column 1:**
- Tag: ACTIVE CLIENT WORK
- Title: Middleware & Integrations
- Body: Connecting LLM APIs to the tools your team already uses — Slack, Teams, internal platforms. Production systems, not proof-of-concept demos.

**Column 2:**
- Tag: CORE EXPERTISE
- Title: AI Product Architecture
- Body: Model routing, prompt orchestration, memory systems, and evaluation frameworks. Designed for reliability and cost efficiency at scale.

**Column 3:**
- Tag: HOW I WORK
- Title: Rapid Prototyping to Production
- Body: From concept to working system in weeks, not quarters. Architecture first, then fast iteration with real feedback loops.

### Proof strip (horizontal bar, minimal)

| 10+ Years in B2B SaaS | Production AI Systems Live | PM Background → Builder | Kansas City, MO · Remote |

> NOTE: These are qualitative proof points, not vanity metrics. No line counts, no commit counts, no token counts.

### Bottom CTA

**Heading:** Have an AI problem that needs solving?
**Body:** I take on a small number of engagements and prioritize long-term partnerships.
**Button:** "Get in Touch" → /contact

---

## PAGE 2: WORK (/work)

### Page header

**Eyebrow:** Selected Work
**Headline:** What I've built.
**Subhead:** Client systems, personal infrastructure, and open source. Each project is real — running in production or published for others to use.

### Project 1: Lytho AI Middleware

- **Tag:** CLIENT WORK · ACTIVE
- **Stack:** Python · FastAPI · Slack API · LLM APIs
- **Description:** Production middleware connecting LLM APIs to enterprise content workflows via Slack. I designed and built the integration layer that enables AI-powered features inside the tools teams already use — at a company that was not previously AI-enabled.
- **Outcomes:**
  - Shipped Insights (AI summarization, analysis, diagrams) and Compliance (brand-guideline enforcement) as production features used by enterprise clients
  - Restructured an underperforming team to deliver a scalable API framework and Slack/Teams integrations
  - Designed guideline intake flows enabling per-client AI agent customization across enterprise accounts

### Project 2: AVHA — A Very Helpful Assistant

- **Tag:** PERSONAL BUILD · FLAGSHIP
- **Stack:** FastAPI · React · Groq · Telegram · Supabase
- **Description:** My primary AI interface — a personal assistant running on a model router with layered memory, accessible via Telegram and web. This is where I stress-test architectural patterns before recommending them to clients. If it works for my daily workflow, it's ready for production.
- **Outcomes:**
  - Model router using Groq for intelligent routing across LLM providers based on task complexity
  - Multi-layer memory system with vector search for persistent, context-aware conversations
  - Live and in daily personal use — not a demo, a working system I depend on

### Project 3: react-split-flap-display

- **Tag:** OPEN SOURCE · NPM PACKAGE
- **Stack:** TypeScript · React · Web Audio API · CSS 3D Transforms
- **Description:** A composable React component that renders split-flap / Solari-style displays with realistic 3D flip animation, character cascading, multiple visual styles, and a built-in sound engine. Published on npm, used on this site.
- **Outcomes:**
  - Zero-dependency React component with five color themes, two visual variants (modern + classic), and four size presets
  - Web Audio API sound engine synthesizing mechanical "clack" sounds at runtime — no bundled audio files
  - Open source under MIT license — designed for other developers to install and use

> NOTE: Link to the GitHub repo and npm package page. The fact that the component
> is visibly running on this very site (the homepage headline) is the proof.

### Project 4: This Site

- **Tag:** META · PORTFOLIO AS PROOF
- **Stack:** Next.js · TypeScript · Claude Code
- **Description:** A portfolio site that practices what it preaches. The entire site was built AI-first using Claude Code — not as a gimmick, but because that's how I build everything. It integrates the split-flap display component, runs on Next.js, and was designed to load fast with zero client-side bloat.
- **Outcomes:**
  - Built end-to-end with Claude Code as the primary development tool
  - Integrates a custom open-source React component (the split-flap display) as a signature UI element
  - Designed as a consulting storefront, not a job-seeker portfolio — every element exists to build trust with a prospective client

---

## PAGE 3: ABOUT (/about)

### Page header

**Eyebrow:** About
**Headline:** The short version.

### Two-column layout

**Left column — Story (3 paragraphs, that's it):**

I run Ranger Ventures LLC, an AI consulting practice focused on building production systems for B2B SaaS companies. I design and ship middleware, integrations, and intelligent workflows — the connective tissue between LLMs and the tools teams actually use.

My path was non-linear. I started in mortgage lending, taught myself to code, spent nearly eight years at DivvyHQ growing from developer to Director of Product, then moved into AI-focused product management at Lytho. In 2025 I went independent because I was done talking about AI strategy and ready to build it.

The through-line: I've always been the person who bridges the gap between what leadership wants and what engineering can deliver. The difference now is I also write the code.

**Right column — How I Work + Stack:**

**How I Work**
Architecture first, then fast iteration. I scope deeply before writing a line of code, then ship in tight cycles with real feedback. I'd rather solve one problem completely than spread across five half-finished features. I challenge assumptions — mine and yours. If the AI approach is wrong for the problem, I'll say so.

**Stack**
- LANGUAGES: Python, TypeScript, SQL
- FRAMEWORKS: FastAPI, Next.js, React
- AI/ML: Claude API, OpenAI, Groq
- INFRA: Supabase, Docker, Railway, GitHub Actions
- TOOLS: Cursor, Claude Code, Git

### Resume strip (bottom of page)

**Left:** Need the formal version?  /  Download my resume as a PDF.
**Right:** [Download PDF ↓] button

> CRITICAL: Fix the resume PDF first. The current one has placeholder text
> ([City, State], [Phone], [Email]). Update it before linking.

---

## PAGE 4: CONTACT (/contact)

### Two-column layout

**Left column:**

**Eyebrow:** Contact
**Headline:** Let's talk.
**Body:** I'm open to consulting engagements, technical partnerships, and advisory roles. If you're building something with AI and need someone who can go from architecture to working code, let's start a conversation.

**Contact details:**
- EMAIL: zach@rangerventures.com (or whatever your actual contact email is)
- LINKEDIN: linkedin.com/in/zach-varney
- GITHUB: github.com/Varnasus

**Right column:**

Simple form — three fields only:
- NAME (text input)
- EMAIL (email input)
- WHAT DO YOU NEED? (textarea, placeholder: "Tell me about the problem you're trying to solve...")
- [Send Message] button

> No multi-step wizard. No project type dropdown. No calendar embed.
> A consulting prospect wants to type a message, not fill out a form.

---

## FOOTER (all pages)

**Left:** © 2026 Ranger Ventures LLC
**Right:** LinkedIn · GitHub

> Remove Twitter/X unless you're actually active there.
> Remove "The source code is available on GitHub" — that's job-seeker energy.

---

## GLOBAL NOTES

### Copy rules
- First person throughout. Never "Zach Varney's career demonstrates..." — always "I built..."
- Never say "AI products that actually work." It appeared 5+ times on the old site. Zero times on the new one.
- Never say "seeking" or "looking for" — you're not looking for anything. People come to you.
- The word "Lytho" appears as a client, not as an employer. "Active client engagement" not "my company."
- VeriForge is not mentioned anywhere.

### What to delete
- /faq → remove entirely
- /timeline → remove entirely
- /resume → remove as a page (keep PDF download link on About)
- /tools → remove entirely (ROI calculator and discovery canvas are gone)
- /case-studies → remove entirely (was already broken/empty)
- /blog → remove entirely (unless there's real content — I didn't find any)
- /demo.html → remove

### Redirects
If you want to be thorough, add redirects in next.config.js:
```js
async redirects() {
  return [
    { source: '/faq', destination: '/', permanent: true },
    { source: '/timeline', destination: '/about', permanent: true },
    { source: '/resume', destination: '/about', permanent: true },
    { source: '/tools', destination: '/work', permanent: true },
    { source: '/tools/:path*', destination: '/work', permanent: true },
    { source: '/case-studies', destination: '/work', permanent: true },
    { source: '/case-studies/:path*', destination: '/work', permanent: true },
    { source: '/blog', destination: '/', permanent: true },
    { source: '/blog/:path*', destination: '/', permanent: true },
  ];
}
```
