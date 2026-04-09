export interface ProjectMeta {
  slug: string
  title: string
  tag: string
  stack: string[]
  description: string
  problem?: string
  tradeoffs?: string
  impact?: string
  outcomes: string[]
  github?: string
  npm?: string
  order: number
}

export const projects: ProjectMeta[] = [
  {
    slug: "avha",
    title: "AVHA \u2014 A Very Helpful Assistant",
    tag: "PERSONAL BUILD \u00b7 FLAGSHIP",
    stack: ["FastAPI", "React", "Groq", "Telegram", "Supabase"],
    description:
      "My primary AI interface \u2014 a personal assistant running on a model router with layered memory, accessible via Telegram and web. This is where I stress-test architectural patterns before recommending them to clients.",
    problem: "Needed a single AI interface that could route between LLM providers based on task complexity while maintaining persistent conversation memory.",
    tradeoffs: "Chose Groq for routing speed over OpenAI for consistency. Built a custom vector memory layer instead of using a managed RAG service for full control over context windows.",
    impact: "In daily personal use as primary AI interface. Patterns developed here have been directly applied to client architectures.",
    outcomes: [
      "Model router using Groq for intelligent routing across LLM providers based on task complexity",
      "Multi-layer memory system with vector search for persistent, context-aware conversations",
      "Live and in daily personal use \u2014 not a demo, a working system I depend on",
    ],
    order: 1,
  },
  {
    slug: "clackboard",
    title: "clackboard",
    tag: "OPEN SOURCE \u00b7 NPM PACKAGE",
    stack: ["TypeScript", "React", "Web Audio API", "CSS 3D Transforms"],
    description:
      "A composable React split-flap display component with realistic 3D flip animation, staggered cascades, physics-based easing, board layouts, and a built-in sound engine. Published on npm, used on this site.",
    problem: "Existing split-flap display components for React were either unmaintained, lacked customization, or didn't render with convincing 3D physics.",
    tradeoffs: "Zero external dependencies keeps the package lightweight but required building a custom Web Audio engine from scratch. Chose CSS 3D transforms over canvas for better accessibility and DOM integration.",
    impact: "Published on npm with five color themes, classic and modern variants, board/departure/scoreboard templates, and physics-based easing. Powers the hero display on this site.",
    outcomes: [
      "Zero-dependency React component with Vestaboard-style board layout, departure boards, scoreboards, and countdown timers",
      "Web Audio API sound engine synthesizing mechanical \u201cclack\u201d sounds at runtime \u2014 no bundled audio files",
      "Physics-based easing (decelerate, spring) and staggered cascade animations for realistic mechanical feel",
      "Open source under MIT license \u2014 designed for other developers to install and use",
    ],
    github: "https://github.com/Varnasus/split-flap-display",
    npm: "https://www.npmjs.com/package/clackboard",
    order: 2,
  },
  {
    slug: "this-site",
    title: "This Site",
    tag: "META \u00b7 PORTFOLIO AS PROOF",
    stack: ["Next.js", "TypeScript", "Claude Code"],
    description:
      "A portfolio site that practices what it preaches. Built AI-first using Claude Code as the primary development tool. Integrates the split-flap display component, runs on Next.js, and was designed to load fast with zero client-side bloat.",
    problem: "Needed a consulting storefront that demonstrates technical capability through its own construction, not just by listing credentials.",
    tradeoffs: "Chose static/ISR over dynamic rendering for speed. No CMS — blog posts are TypeScript objects — trading editorial convenience for zero external dependencies.",
    impact: "Lighthouse scores of 95+ across all categories. Built end-to-end with Claude Code, proving the AI-first workflow the site advocates.",
    outcomes: [
      "Built end-to-end with Claude Code as the primary development tool",
      "Integrates a custom open-source React component (the split-flap display) as a signature UI element",
      "Designed as a consulting storefront, not a job-seeker portfolio \u2014 every element exists to build trust with a prospective client",
    ],
    order: 3,
  },
]
