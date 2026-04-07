# Execution Punch List — zvarney.com Rebuild

Work through these in order. Each phase is independently deployable.

---

## PHASE 0: Prep (30 min)
Do this before touching any code.

- [ ] **Fix the resume PDF.** Open `/public/zach-varney-resume.pdf` and replace [City, State], [Phone], [Email], [LinkedIn], [Portfolio/GitHub] with real info. This is live on the internet right now.
- [ ] **Decide on contact email.** Is it zach@rangerventures.com? Something else? You need this for the Contact page and the resume.
- [ ] **Audit existing repo.** Run `ls` on the pages/app directory to understand the current file structure. Note which files map to which routes.
- [ ] **Install split-flap package** (if published) or set up local reference. If the npm package isn't ready yet, skip the split-flap integration for now and use a placeholder headline — you can swap it in later.

---

## PHASE 1: Gutting (1 hour)
Remove everything that's going away. Deploy after this phase — the site will be smaller but nothing should be broken.

- [ ] **Delete page files** for: FAQ, Timeline, Tools, Case Studies, Blog, Resume (as a page), demo.html
- [ ] **Delete components** that only served deleted pages (timeline carousel, FAQ accordion, tool cards, case study visualizer, newsletter signup, search, etc.)
- [ ] **Add redirects** in `next.config.js` (see SITE-COPY.md for the full redirect map)
- [ ] **Update nav** to only show: Home, Work, About, Contact
- [ ] **Update footer** — remove Twitter link (unless active), remove "source code available on GitHub", change copyright to "© 2026 Ranger Ventures LLC"
- [ ] **Deploy** and verify: all old URLs redirect correctly, no 404s, nav works

---

## PHASE 2: Home Page (2-3 hours)
The most important page. Get this right before touching anything else.

- [ ] **Replace the hero section** with new copy from SITE-COPY.md:
  - Eyebrow: "Ranger Ventures LLC"
  - Headline: "I build AI systems that ship to production."
  - Subhead: the consulting pitch paragraph
  - Two CTA buttons: "Start a Conversation" + "See My Work →"
- [ ] **Replace the middle section** with the 3-column "What I Do" grid (Middleware & Integrations, AI Product Architecture, Rapid Prototyping to Production)
- [ ] **Replace the metrics strip** with qualitative proof points (10+ Years, Production Systems Live, PM → Builder, Kansas City MO)
- [ ] **Replace the bottom CTA** with "Have an AI problem that needs solving?" section
- [ ] **Kill all vanity metrics** — no "12K lines," no "38 commits," no "~2M tokens"
- [ ] **Kill the old tagline** — "AI-First Product Strategist Who Ships Code" should not appear anywhere
- [ ] **Deploy** and check on mobile — the hero is the first thing a prospect sees on their phone

---

## PHASE 3: Work Page (2-3 hours)
The proof page. This is where trust is built.

- [ ] **Create /work route** (or rename existing /tools or /case-studies)
- [ ] **Build project card component** — each card shows: tag, stack, description, and 3 outcome bullets
- [ ] **Add all 4 projects** with copy from SITE-COPY.md:
  1. Lytho AI Middleware
  2. AVHA
  3. react-split-flap-display
  4. This site (meta)
- [ ] **Link project 3** to GitHub repo and npm page (when available)
- [ ] **Deploy** and verify each card reads well, stack labels aren't wrapping weird on mobile

---

## PHASE 4: About Page (1-2 hours)
Keep it tight. Resist the urge to add more.

- [ ] **Create /about route** (or rewrite existing)
- [ ] **Left column:** 3 paragraphs from SITE-COPY.md. No more, no less.
- [ ] **Right column:** "How I Work" section + tech stack list
- [ ] **Bottom strip:** Resume PDF download link/button
- [ ] **Verify the PDF link works** and the file doesn't have placeholder text
- [ ] **Deploy**

---

## PHASE 5: Contact Page (1 hour)
Simplest page. Don't overthink it.

- [ ] **Create /contact route** (or rewrite existing)
- [ ] **Left column:** headline, pitch paragraph, contact details (email, LinkedIn, GitHub)
- [ ] **Right column:** 3-field form (name, email, message textarea)
- [ ] **Wire up form submission** — Formspree, Resend, or whatever the existing site uses
- [ ] **Test the form** — submit a test message, confirm it arrives
- [ ] **Deploy**

---

## PHASE 6: Split-Flap Integration (1-2 hours)
Only do this after the split-flap npm package is published or locally installable.

- [ ] **Install** `react-split-flap-display` in the site repo
- [ ] **Replace the homepage headline** with a `<SplitFlap>` component
  - Decide: static display that animates on page load, or cycling ticker
  - Recommend starting with a single phrase that flips in on load — less gimmicky
  - Use `size="lg"` or `size="xl"`, `color="ranger"` or whatever matches your site theme
- [ ] **Optional:** Add split-flap to the proof strip (stats flip in on scroll using IntersectionObserver)
- [ ] **Optional:** Add a "currently building" status board somewhere (clock + status label)
- [ ] **Test with sound** — `sound` prop enabled. Does it enhance or annoy? Might want `sound={false}` by default with an easter egg toggle.
- [ ] **Deploy**

---

## PHASE 7: Polish (1 hour)
Final pass before sharing with anyone.

- [ ] **Meta tags** — update `<title>`, `og:title`, `og:description`, `og:image` on all pages
  - Title format: "Zach Varney — AI Consulting & Development" (not the old tagline)
  - Description: "AI consulting & development for B2B SaaS. Middleware, integrations, and intelligent workflows."
- [ ] **Favicon** — update if it's still a generic Next.js icon
- [ ] **404 page** — simple page with nav, "This page doesn't exist" message, and link home
- [ ] **Speed check** — run Lighthouse. Target 90+ on performance. Remove any unused JS bundles from deleted pages.
- [ ] **Mobile check** — test all 4 pages on phone-width. The project cards on /work are the most likely to break.
- [ ] **Link check** — verify every internal link, the resume PDF, external links (LinkedIn, GitHub)
- [ ] **Deploy final version**

---

## Estimated Total: 10-14 hours across 7 phases

Each phase is independently deployable. You could do Phase 0-2 in one session and have a dramatically better site live by end of day, then chip away at the rest.

The split-flap integration (Phase 6) is intentionally last — the site should work great without it. The component is the cherry on top, not the foundation.
