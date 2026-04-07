# CLAUDE.md — zvarney.com Portfolio Site

## What This Is
Personal portfolio and consulting storefront for Zach Varney / Ranger Ventures LLC. This is NOT a job-seeker portfolio. It's a consulting storefront — the goal is for a prospective client to understand what Zach does, see proof he can deliver, and reach out.

## Owner
Zach Varney — github.com/Varnasus — Ranger Ventures LLC
Based in Kansas City, MO. Remote-friendly.

## Tech Stack
- **Framework:** Next.js (existing site, rewriting in place)
- **Language:** TypeScript
- **Styling:** TBD — match existing site approach (likely Tailwind or CSS modules)
- **Deployment:** Vercel (assumed — check existing config)
- **Key dependency:** `react-split-flap-display` (npm package, also built by Zach)

## Site Structure
```
/ (Home)       — The pitch. Who I am, what I do, one clear CTA.
/work          — The proof. 4 featured projects with problem → approach → outcome.
/about         — The trust builder. Short bio, how I work, tech stack, resume download.
/contact       — Simple 3-field form. Name, email, message.
```

**That's it. Four pages.** No FAQ, no Timeline, no Tools, no Blog, no Case Studies.

## Design Direction
- Dark theme, editorial feel
- Warm accent color (forest green for Ranger brand, or gold — check existing)
- Typography: distinctive display font + clean body font + monospace for labels/tags
- Split-flap display component as signature UI element (homepage headline)
- Minimal layout — no vanity metrics, no stock photos, no filler sections
- Mobile responsive

## Content Rules (CRITICAL — read before writing any copy)
1. **First person always.** Never "Zach Varney's career demonstrates..." → always "I built..."
2. **Never say "AI products that actually work."** This phrase is banned. It was on the old site 5+ times.
3. **Never say "seeking" or "looking for."** Zach is not looking for work. Clients come to him.
4. **Lytho is a client, not an employer.** "Active client engagement" not "my company."
5. **VeriForge is never mentioned.** Only Ranger Ventures.
6. **No vanity metrics.** No line counts, commit counts, or token counts. Qualitative proof points only.
7. **No "AI-First Product Strategist Who Ships Code."** That was the old tagline. Kill it.

## Pages That Were Deleted (redirect to appropriate destination)
- /faq → /
- /timeline → /about
- /resume → /about
- /tools, /tools/* → /work
- /case-studies, /case-studies/* → /work
- /blog, /blog/* → /
- /demo.html → remove

## Featured Projects (Work page)
1. **Lytho AI Middleware** — Active client work. Python/FastAPI/Slack API/LLM APIs.
2. **AVHA** — Personal AI assistant. FastAPI/React/Groq/Telegram/Supabase.
3. **react-split-flap-display** — Open source npm package. TypeScript/React/Web Audio API.
4. **This site** — Meta proof point. Next.js/TypeScript/Claude Code.

## Key Files
- `SITE-COPY.md` — Complete page-by-page copy for all four pages. Use this as the source of truth for all text content.
- `next.config.js` — Add redirects for deleted pages here.

## Resume PDF
The existing resume PDF at `/public/zach-varney-resume.pdf` has PLACEHOLDER TEXT ([City, State], [Phone], [Email]). This MUST be fixed before the site goes live. Either update the PDF or remove the download link until it's ready.

## Contact Form
Simple 3-field form: name, email, message. No multi-step wizard, no project type dropdown, no calendar embed. The form should send to whatever backend/service the existing site uses, or set up a simple email forwarding service (Formspree, Resend, etc.).

## Implementation Notes
- Rewrite in place — this is the existing Next.js repo, not a new project.
- Delete old page files for FAQ, Timeline, Resume, Tools, Case Studies, Blog.
- The split-flap display component ships as an npm package (`react-split-flap-display`). Install it and import it — don't copy the source code into this repo.
- If the split-flap package isn't published to npm yet, use a local file reference in package.json or copy the built dist/ temporarily.
