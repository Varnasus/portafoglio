export interface ProjectMeta {
  slug: string
  title: string
  tag: string
  stack: string[]
  description: string
  outcomes: string[]
  github?: string
  npm?: string
  order: number
}

export const projects: ProjectMeta[] = [
  {
    slug: "lytho-ai-middleware",
    title: "Lytho AI Middleware",
    tag: "CLIENT WORK \u00b7 ACTIVE",
    stack: ["Python", "FastAPI", "Slack API", "LLM APIs"],
    description:
      "Production middleware connecting LLM APIs to enterprise content workflows via Slack. I designed and built the integration layer that enables AI-powered features inside the tools teams already use \u2014 at a company that was not previously AI-enabled.",
    outcomes: [
      "Shipped Insights (AI summarization, analysis, diagrams) and Compliance (brand-guideline enforcement) as production features used by enterprise clients",
      "Restructured an underperforming team to deliver a scalable API framework and Slack/Teams integrations",
      "Designed guideline intake flows enabling per-client AI agent customization across enterprise accounts",
    ],
    order: 1,
  },
  {
    slug: "avha",
    title: "AVHA \u2014 A Very Helpful Assistant",
    tag: "PERSONAL BUILD \u00b7 FLAGSHIP",
    stack: ["FastAPI", "React", "Groq", "Telegram", "Supabase"],
    description:
      "My primary AI interface \u2014 a personal assistant running on a model router with layered memory, accessible via Telegram and web. This is where I stress-test architectural patterns before recommending them to clients.",
    outcomes: [
      "Model router using Groq for intelligent routing across LLM providers based on task complexity",
      "Multi-layer memory system with vector search for persistent, context-aware conversations",
      "Live and in daily personal use \u2014 not a demo, a working system I depend on",
    ],
    order: 2,
  },
  {
    slug: "react-split-flap-display",
    title: "react-split-flap-display",
    tag: "OPEN SOURCE \u00b7 NPM PACKAGE",
    stack: ["TypeScript", "React", "Web Audio API", "CSS 3D Transforms"],
    description:
      "A composable React component that renders split-flap / Solari-style displays with realistic 3D flip animation, character cascading, multiple visual styles, and a built-in sound engine. Published on npm, used on this site.",
    outcomes: [
      "Zero-dependency React component with five color themes, two visual variants (modern + classic), and four size presets",
      "Web Audio API sound engine synthesizing mechanical \u201cclack\u201d sounds at runtime \u2014 no bundled audio files",
      "Open source under MIT license \u2014 designed for other developers to install and use",
    ],
    github: "https://github.com/Varnasus/react-split-flap-display",
    npm: "https://www.npmjs.com/package/react-split-flap-display",
    order: 3,
  },
  {
    slug: "this-site",
    title: "This Site",
    tag: "META \u00b7 PORTFOLIO AS PROOF",
    stack: ["Next.js", "TypeScript", "Claude Code"],
    description:
      "A portfolio site that practices what it preaches. Built AI-first using Claude Code as the primary development tool. Integrates the split-flap display component, runs on Next.js, and was designed to load fast with zero client-side bloat.",
    outcomes: [
      "Built end-to-end with Claude Code as the primary development tool",
      "Integrates a custom open-source React component (the split-flap display) as a signature UI element",
      "Designed as a consulting storefront, not a job-seeker portfolio \u2014 every element exists to build trust with a prospective client",
    ],
    order: 4,
  },
]
