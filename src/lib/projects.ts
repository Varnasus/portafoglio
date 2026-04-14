export interface ProjectMeta {
  slug: string
  title: string
  tag: string
  stack: string[]
  hook: string
  cleverness?: string
  speedStory?: string
  tradeoff?: string
  soWhat?: string
  github?: string
  npm?: string
  url?: string
  stealth?: boolean
  order: number
}

export const projects: ProjectMeta[] = [
  {
    slug: "watchtower",
    title: "Watchtower",
    tag: "PERSONAL BUILD \u00b7 PRODUCT ANALYTICS",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Tailwind"],
    hook: `Pendo charges north of $30k a year to tell you how your users behave. I built the version I actually wanted — product analytics and in-app onboarding for every project I run, owned end-to-end, with no per-seat tax and no vendor lock-in.`,
    cleverness: `The whole app is built around a single seam: plug real credentials in and every view hot-swaps to live data; pull them out and it keeps working on realistic fixtures. That means the dashboard is never broken, demos never embarrass you, and new features can be designed against real-looking data before the backend exists. It's the kind of decision that costs nothing up front and pays you back every single day after.`,
    speedStory: `At a traditional SaaS company this is a PM, a designer, two engineers, and a full quarter of roadmap — six months before the first real dashboard ships, probably nine before the drop-in SDK does. I had a working dashboard, a one-line SDK, and an in-app guide renderer running solo before most teams would have finished scoping the vendor replacement.`,
    tradeoff: `I deliberately shipped mock data and a wide-open dashboard before I built auth. The risky bet was whether the data layer could stay clean as features grew — getting that wrong in week three would have cost me far more than bolting auth on in week four. Choosing what not to build first is where most personal projects die; I treat it as a scheduling problem, not a feature list.`,
    soWhat: `If you're paying six figures a year for a SaaS tool that does three things you actually care about, I can build you the version you really want — and you'll own it. This project is proof I can ship the whole stack end-to-end: the data model, the UI, the drop-in client, and the product thinking that decides which pieces matter in what order.`,
    order: 1,
  },
  {
    slug: "avha",
    title: "AVHA",
    tag: "PERSONAL BUILD \u00b7 AGENTIC PLATFORM",
    stack: ["Python", "FastAPI", "Next.js", "LLM Orchestration", "Docker"],
    hook: `I got tired of context-switching between five tools to manage my work, my inbox, my calendar, and my side projects — so I built an assistant that lives across all of them and actually remembers what's going on. It's the operating layer I wished existed: one brain, every surface, no friction.`,
    cleverness: `The whole thing runs on a tiered model strategy — local inference for the cheap stuff, frontier models only when the work demands it — which keeps cost near zero without giving up quality. The memory layer is split into two halves: one for things humans wrote, one for things the assistant learned, with a hard rule about which side owns what. That single decision killed an entire category of bugs I kept watching other agent projects ship into.`,
    speedStory: `At a traditional company this is a 12-person team across backend, frontend, ML, and DevOps, running for two or three quarters before anyone sees a demo. I built it solo, in evenings and weekends, and it's been live in production for months — running my actual life, not a sandbox.`,
    tradeoff: `I deliberately skipped multi-tenant architecture, fancy admin UIs, and anything resembling enterprise polish — this is a single-user system, which let me move ten times faster and ship features the day I needed them. When the goal is proving an idea works, building for "everyone" is the slowest possible path.`,
    soWhat: `Most teams are still arguing about whether to "do AI." I've already shipped a production agent platform that integrates with the messy reality of someone's actual workflow — calendar, email, chat, docs, code. If you're trying to figure out what an agent strategy actually looks like inside your business, I've already lived the lessons you're about to learn the hard way.`,
    order: 2,
  },
  {
    slug: "bidwatch",
    title: "BidWatch",
    tag: "PERSONAL BUILD \u00b7 CONSUMER PWA",
    stack: ["Next.js", "TypeScript", "Cheerio", "NextAuth", "Vercel"],
    hook: `My wife was all over these online estate auctions, but found it hard to use and manual to track. So I built her a phone app that tells her — at a glance — whether the thing she's about to bid on is actually a steal or a trap.`,
    cleverness: `The auction site has no API, so I reverse-engineered the catalog into a self-refreshing feed and made the app reason backwards from retail value: instead of "what's the bid?" it answers "what's the highest you can bid before this stops being a deal?" Every lot gets a one-glance verdict — Steal, Great, Fair, Over Retail — so the user never has to do mental math while a 30-second snipe window is closing.`,
    speedStory: `At a real company this is a six-month roadmap item: a PM, two engineers, a designer, a scraping vendor pitch, a "should we even build this?" review. I shipped it solo over a weekend, deployed to production behind auth, and had my wife using it on her phone the same week.`,
    tradeoff: `I deliberately skipped a database, user accounts beyond a hardcoded allowlist, and any backend state — everything lives in the browser. That sounds lazy until you realize it took the infrastructure cost to zero, the deploy pipeline to one command, and the audience-of-two product to "done" instead of "in progress forever." She still has to go to the website to bid on an item, but that's an easy trade-off considering the value she's getting out of it from the initial load.`,
    soWhat: `This is what happens when someone who can actually build sees a problem in the wild: no committee, no JIRA, no vendor evaluation — just a working product in a week. If your team has a "we should really build a tool for that" sitting in a backlog, that's the kind of work I turn into shipped software while everyone else is still scoping it.`,
    order: 3,
  },
  {
    slug: "earth-3007",
    title: "Earth 3007",
    tag: "PERSONAL BUILD \u00b7 MULTI-AGENT AI",
    stack: ["TypeScript", "Claude API", "Ollama", "WebSockets", "SQLite"],
    hook: `A small society of AI characters that actually live somewhere — they remember each other, form relationships, pursue their own goals, and you can watch it happen in real time. Not a chatbot demo. A persistent world where autonomous agents behave like inhabitants instead of tools.`,
    cleverness: `The interesting trick is the routing layer: routine moments run on a cheap local model, but the moments that actually matter — social interactions, conflict, discovery — get escalated to a frontier model. That asymmetry is what makes it economically viable to run multiple agents continuously without the personalities collapsing into mush. Most people building "AI agents" pay frontier prices for every tick, or save money and get lifeless bots. This gets both.`,
    speedStory: `At a traditional studio this is a multi-quarter R&D project — a producer, two engineers, a designer, a prompt specialist, weeks of architecture meetings before line one. I built it solo, in evenings, on a laptop.`,
    tradeoff: `Zero tests, zero CI, no production hardening — validated entirely against a live server with my own eyes. That was the right call because the value of the project is the experiment, not the artifact. Time spent on infrastructure is time not spent watching the agents do something I didn't expect.`,
    soWhat: `If you need autonomous agents that operate continuously in a live environment — handling real workflows, holding state, coordinating with each other, doing the right thing when nobody is looking — this is the exact muscle. Most "agentic AI" pitches stop at a single LLM call wrapped in a loop. I've built the version that actually keeps running.`,
    order: 4,
  },
  {
    slug: "master-of-coin",
    title: "Master of Coin",
    tag: "PERSONAL BUILD \u00b7 FULL-STACK PWA",
    stack: ["Next.js", "TypeScript", "Supabase", "Plaid", "Google Vision"],
    hook: `A household's money lives in five different apps, four logins, and one shared spreadsheet that nobody updates. This is one place where two people can actually see where the money goes — bills, banks, receipts, and trends — without arguing about who forgot to log the Costco run. Also, I wanted the old Mint app, so I built it.`,
    cleverness: `Most budget apps make humans do the boring work: categorize, reconcile, mark bills paid. I flipped that — bank transactions flow in automatically, receipts get read by a camera, and the system quietly matches them against expected bills on its own. The clever part isn't any single integration; it's wiring a handful of commodity services together so the app feels like it's thinking, while the actual logic stays small enough for one person to own end-to-end.`,
    speedStory: `At a real company this is a six-person pod for a quarter — PM, two engineers, a designer, a data person, and someone to argue about the schema for two weeks. I shipped it solo, on nights and weekends, as an installable app deployed to my own domain.`,
    tradeoff: `I deliberately built it for two users, not two million — no multi-tenant scaffolding, no analytics warehouse, no enterprise auth. That's the whole point: by refusing to pre-build for a future that may never come, the thing actually got finished and used. Scope discipline is the feature.`,
    soWhat: `Most internal tools fail because nobody wants to own the boring 80% — the ingestion, the matching, the notifications, the "does it work on my phone at the grocery store" details. I do. If you have a workflow that's currently held together by spreadsheets and goodwill, I can replace it with something your team will actually open on a Tuesday.`,
    order: 5,
  },
  {
    slug: "clackboard",
    title: "clackboard",
    tag: "OPEN SOURCE \u00b7 NPM PACKAGE",
    stack: ["React", "TypeScript", "Web Audio API", "CSS 3D", "Zero Dependencies"],
    hook: `A drop-in React component that brings the satisfying clack of an airport departure board to any web app. It's one of those details that turns "another dashboard" into something people actually screenshot and share. It powers the hero display on this site.`,
    cleverness: `Most components like this ship audio files and pre-baked CSS keyframes — bloated, inflexible, and dead on arrival. Mine synthesizes the mechanical clack at runtime in the browser (zero bytes shipped) and models the flip as physical inertia rather than a canned ease curve, so the motion and sound actually agree with each other. The whole package has zero runtime dependencies, which is the kind of constraint most teams talk about but never enforce.`,
    speedStory: `At a traditional company, "build a reusable animated display component with sound, themes, accessibility, SSR safety, and five drop-in templates" is a quarter-long initiative — a designer, two engineers, a PM, and a sound contractor. I scoped, built, tested, and shipped it solo to npm in days.`,
    tradeoff: `I deliberately said no to a configuration UI, a plugin system, and image-based theming. The component does one thing extremely well, stays tiny, and trusts developers to compose it — instead of becoming the kind of "do-everything" library that nobody can debug six months later.`,
    soWhat: `This is the tell: when a problem looks like "fun side project," I still ship it like production software — typed, tested, accessible, SSR-safe, and zero-dep. That's the same instinct I bring to client work, which is why the AI systems I build for clients don't end up as demos that quietly rot in a repo.`,
    url: "https://varnasus.github.io/split-flap-display/demo/",
    github: "https://github.com/Varnasus/split-flap-display",
    npm: "https://www.npmjs.com/package/clackboard",
    order: 6,
  },
  {
    slug: "project-v",
    title: "Project V.",
    tag: "STEALTH \u00b7 INFRASTRUCTURE BET",
    stack: ["Python", "Real-Time Systems"],
    hook: `There's a line item enterprise buyers treat as a fixed cost. It isn't. I rebuilt the thing they're paying a vendor five figures a month for — runs on a laptop, no third party in the loop, an order of magnitude off on economics. Shipped solo, in an afternoon. The interesting question isn't whether it works. It's what happens to the incumbents when it does.`,
    stealth: true,
    order: 7,
  },
  {
    slug: "project-gt",
    title: "Project G.T.",
    tag: "STEALTH \u00b7 CONSUMER BET",
    stack: ["Next.js", "TypeScript"],
    hook: `A consumer category I've been watching has a structural flaw — the default mechanics reward the top 1% of users and quietly burn out everyone else. I think the other 99% is the actual market, and I built a working version of the product that serves them. Full UX, end-to-end, in a week. More when it's live.`,
    stealth: true,
    order: 8,
  },
  {
    slug: "project-l",
    title: "Project L.",
    tag: "STEALTH \u00b7 FORMAT BET",
    stack: ["Next.js", "Generative AI"],
    hook: `A format that wasn't possible twelve months ago — where the output is different for every person who touches it and costs pennies to produce. Everyone in this space is bolting AI onto an old product. I inverted the stack: the generative layer is the product. Shipped the first complete version solo, in a week.`,
    stealth: true,
    order: 9,
  },
  {
    slug: "project-fh",
    title: "Project F.H.",
    tag: "STEALTH \u00b7 TRUST BET",
    stack: ["Next.js", "TypeScript"],
    hook: `I'm building in a space where trust is the entire product, and where every competitor I've looked at is cutting the exact corner that makes trust possible. I didn't. The guarantee lives at the data layer, not the UI, which means it holds even when I'm not in the room. Built end-to-end, solo, on a founder timeline.`,
    stealth: true,
    order: 10,
  },
]
