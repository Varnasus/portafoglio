import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100">
              <span className="text-blue-400">◆</span>
              AI-First Product Strategist
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl leading-[1.05] mb-6">
              I don&apos;t just build<br />
              roadmaps. I build{" "}
              <span className="text-blue-600">products.</span>
            </h1>

            <p className="text-xl leading-8 text-muted-foreground max-w-2xl mb-4">
              Technical PM background meets AI-native workflow. Every tool on this site is real and
              interactive — built with Claude Code. Shipping code is how I validate strategy.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-mono text-muted-foreground mb-10">
              <span className="flex items-center gap-1.5">
                <span className="text-blue-400 text-xs">◆</span>
                Kansas City, MO (Remote-friendly)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-blue-400 text-xs">◆</span>
                AI Technical PM at Lytho
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-blue-400 text-xs">◆</span>
                Developer background since 2016
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Button asChild size="lg">
                <Link href="/tools/roi-calculator">Try the ROI Calculator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/tools/discovery-canvas">Open Discovery Canvas</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/demo.html" target="_blank">Interactive Demo ↗</Link>
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border-t pt-8">
              {[
                { num: "12K+", label: "Lines Shipped", sub: "This portfolio alone" },
                { num: "38", label: "Git Commits", sub: "AI-assisted, every one" },
                { num: "2", label: "Working Tools", sub: "Try them — they're live" },
                { num: "12+", label: "Years B2B SaaS", sub: "Developer to Director" },
                { num: "~2M", label: "AI Tokens Used", sub: "Building this with Claude" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-6 border-r last:border-r-0 first:pl-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="text-2xl font-extrabold font-mono tracking-tight mb-1">{s.num}</div>
                  <div className="text-xs font-semibold text-foreground mb-0.5">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What I Do Differently */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">The Difference</div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Strategy without code is just guessing
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Most PMs write specs and hand them to engineers. I write the spec, prototype it, and ship it.
            </p>
          </div>
          <div className="mx-auto max-w-none grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                icon: "◆",
                name: "I Build the Tools I Recommend",
                description:
                  "The ROI Calculator and Discovery Canvas on this site are real, working tools — built in Next.js, TypeScript, and Chart.js. Not mockups. Not Figma frames.",
              },
              {
                icon: "◆",
                name: "AI-Native Workflow",
                description:
                  "This entire portfolio was built AI-first using Claude Code. ~2M tokens, 38 commits, 12K+ lines. That's not a talking point — it's the proof.",
              },
              {
                icon: "◆",
                name: "Technical Enough to Challenge Engineers",
                description:
                  "Developer background since 2016. I can review PRs, write evals, and debug LLM pipelines. Strategic enough to lead executives, technical enough to earn engineering trust.",
              },
            ].map((f) => (
              <div key={f.name} className="flex flex-col p-6 bg-background rounded-xl border">
                <div className="text-blue-500 text-lg mb-3 font-mono">{f.icon}</div>
                <dt className="text-lg font-semibold leading-7 mb-3">{f.name}</dt>
                <dd className="text-sm leading-7 text-muted-foreground">{f.description}</dd>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive Tools */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center mb-12">
            <div className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-3">Interactive</div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Try the tools I built
            </h2>
            <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              The ROI Calculator and Product Discovery Canvas aren&apos;t screenshots — they&apos;re working
              applications you can interact with right now.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 bg-background rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">AI ROI Calculator</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time ROI calculations with interactive chart visualizations. Adjust sliders, copy and share results.
              </p>
              <Button asChild size="sm">
                <Link href="/tools/roi-calculator">Try Calculator →</Link>
              </Button>
            </div>
            <div className="p-6 bg-background rounded-xl border hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3">🗺️</div>
              <h3 className="font-semibold mb-2">Product Discovery Canvas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                12-section AI product discovery framework with AI assistant, auto-save, and text export.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/tools/discovery-canvas">Open Canvas →</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to ship an AI product that actually works?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Available for senior AI PM roles and strategic consulting engagements.
              Kansas City, MO — remote-friendly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">View Resume</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
