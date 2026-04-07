import { Container } from "@/components/ui/container"

export const metadata = {
  title: "About",
  description: "AI consultant and developer building production systems for B2B SaaS companies. Ranger Ventures LLC.",
}

const stack = [
  { category: "LANGUAGES", items: "Python, TypeScript, SQL" },
  { category: "FRAMEWORKS", items: "FastAPI, Next.js, React" },
  { category: "AI/ML", items: "Claude API, OpenAI, Groq" },
  { category: "INFRA", items: "Supabase, Docker, Railway, GitHub Actions" },
  { category: "TOOLS", items: "Cursor, Claude Code, Git" },
]

export default function AboutPage() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            About
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-12">
            The short version.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column — Story */}
            <div className="space-y-6">
              <p className="text-lg leading-8 text-muted-foreground">
                I run Ranger Ventures LLC, an AI consulting practice focused on building
                production systems for B2B SaaS companies. I design and ship middleware,
                integrations, and intelligent workflows &mdash; the connective tissue
                between LLMs and the tools teams actually use.
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                My path was non-linear. I started in mortgage lending, taught myself to
                code, spent nearly eight years at DivvyHQ growing from developer to
                Director of Product, then moved into AI-focused product management at
                Lytho. In 2025 I went independent because I was done talking about AI
                strategy and ready to build it.
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                The through-line: I&apos;ve always been the person who bridges the gap
                between what leadership wants and what engineering can deliver. The
                difference now is I also write the code.
              </p>
            </div>

            {/* Right column — How I Work + Stack */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">How I Work</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Architecture first, then fast iteration. I scope deeply before writing
                  a line of code, then ship in tight cycles with real feedback. I&apos;d
                  rather solve one problem completely than spread across five half-finished
                  features. I challenge assumptions &mdash; mine and yours. If the AI
                  approach is wrong for the problem, I&apos;ll say so.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Stack</h2>
                <div className="space-y-3">
                  {stack.map((s) => (
                    <div key={s.category} className="flex gap-4 text-sm">
                      <span className="font-mono text-xs text-primary/70 tracking-widest w-24 flex-shrink-0 pt-0.5">
                        {s.category}
                      </span>
                      <span className="text-muted-foreground">{s.items}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resume strip — hidden until PDF is fixed */}
          {/*
          <div className="mt-16 pt-8 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Need the formal version? Download my resume as a PDF.
            </p>
            <a
              href="/zach-varney-resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted/50 transition-colors"
            >
              Download PDF &darr;
            </a>
          </div>
          */}
        </div>
      </Container>
    </section>
  )
}
