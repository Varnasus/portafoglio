"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Headline } from "@/components/headline"
import { FadeIn } from "@/components/fade-in"
import { GitHubStatsClient, type StatsProps } from "@/components/github-stats"
import { ContributionGraph } from "@/components/contribution-graph"
import type { ContributionDay } from "@/lib/github"

interface HomeViewsProps {
  stats: StatsProps
  contributions: ContributionDay[]
  totalContributions: number
}

const SERVICES = [
  {
    tag: "SHIPPING, NOT STRATEGY",
    title: "AI Development",
    body: "Custom AI tools, agents, and middleware. Give me a few hours with your API keys and I\u2019ll plug the gaps between Jira, Confluence, Linear, analytics, and identity \u2014 the systems your team has been working around for months.",
  },
  {
    tag: "PATTERN RECOGNITION",
    title: "Technical Consulting",
    body: "A decade of B2B SaaS instincts paired with AI that moves at the speed of thought. I walk in, figure out what\u2019s actually broken, and fix it with what\u2019s available. Architecture, implementation, and the judgment calls in between.",
  },
  {
    tag: "REUSE THE WHEEL",
    title: "Open Source",
    body: "NPM packages, public tools, and community contributions. I don\u2019t reinvent the wheel \u2014 I reuse it, optimize as I go, and ship. Everything I build is designed to be picked up and used by the next person.",
  },
]

const PROOF_POINTS = [
  "A Decade of Pattern Recognition",
  "Production Systems Shipping Now",
  "Builder & Founder",
  "Kansas City, MO \u00b7 Remote",
]

function ViewToggle({
  view,
  onToggle,
}: {
  view: "professional" | "engineering"
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <button
        onClick={onToggle}
        className="group flex items-center gap-4 px-6 py-3 rounded-full border border-border/60 hover:border-primary/40 transition-all text-sm min-h-[44px]"
      >
        <span className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full transition-colors duration-300 ${
              view === "professional" ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
          <span
            className={`transition-colors duration-300 ${
              view === "professional"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Strategy
          </span>
        </span>
        <span className="text-border/60">|</span>
        <span className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full transition-colors duration-300 ${
              view === "engineering" ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
          <span
            className={`transition-colors duration-300 ${
              view === "engineering"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Engineering
          </span>
        </span>
      </button>
      <span className="text-xs text-muted-foreground/40 font-mono hidden sm:inline">
        {view === "professional" ? "// the pitch" : "// the proof"}
      </span>
    </div>
  )
}

function ProfessionalView() {
  return (
    <div className="view-transition">
      {/* What I Do */}
      <section className="py-20 bg-muted/50">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-none grid grid-cols-1 gap-8 lg:grid-cols-3">
              {SERVICES.map((col) => (
                <div
                  key={col.title}
                  className="hover-card flex flex-col p-6 bg-background rounded-xl border"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 font-mono">
                    {col.tag}
                  </span>
                  <h3 className="text-lg font-semibold leading-7 mb-3">
                    {col.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Proof Strip */}
      <section className="py-12 border-y">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {PROOF_POINTS.map((point) => (
              <p
                key={point}
                className="text-sm font-medium text-muted-foreground font-mono tracking-tight"
              >
                {point}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">
                Done talking about AI? Let&apos;s build something.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                I work with companies and leaders who already know AI matters
                and need someone who ships. A small number of engagements,
                prioritizing long-term partnerships.
              </p>
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Link href="/contact">
                    Get in Touch
                    <span className="ml-2" aria-hidden>
                      &rarr;
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

function EngineeringView({
  stats,
  contributions,
  totalContributions,
}: {
  stats: StatsProps
  contributions: ContributionDay[]
  totalContributions: number
}) {
  return (
    <div className="view-transition">
      {/* Stats — split-flap counters */}
      <section className="py-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="p-8 bg-card rounded-xl border">
              <GitHubStatsClient {...stats} />
            </div>
          </div>
        </Container>
      </section>

      {/* Contribution grid */}
      <section className="pb-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="p-6 bg-card rounded-xl border">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-primary font-mono">
                  Contributions
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {totalContributions.toLocaleString()} this year
                </span>
              </div>
              {contributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <ContributionGraph data={contributions} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add a GITHUB_TOKEN to display contributions.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Proof-of-craft callout — this site + clackboard */}
      <section className="pb-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="p-6 md:p-8 bg-card rounded-xl border border-primary/20">
              <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 font-mono block">
                This Site Is The Proof
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
                The split-flap above is my npm package.
              </h3>
              <p className="text-sm md:text-base leading-7 text-muted-foreground mb-4">
                Every commit in the graph above is mine. The hero board is{" "}
                <Link
                  href="https://www.npmjs.com/package/clackboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-foreground transition-colors underline underline-offset-4 decoration-primary/40"
                >
                  clackboard
                </Link>
                , a zero-dependency React component I wrote, published to
                npm, and dropped into this site. The site itself is built
                with Next.js and Claude Code. No template, no agency, no
                CMS. If you&apos;re wondering what &ldquo;ships production
                code&rdquo; looks like &mdash; you&apos;re looking at it.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <Link
                  href="https://varnasus.github.io/split-flap-display/demo/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  See the demo &rarr;
                </Link>
                <Link
                  href="https://github.com/Varnasus/split-flap-display"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  Source on GitHub &rarr;
                </Link>
                <Link
                  href="/work"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  More like this &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services — compact */}
      <section className="py-10 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((col) => (
              <div
                key={col.title}
                className="hover-card flex flex-col p-5 bg-background rounded-xl border"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-primary mb-2 font-mono">
                  {col.tag}
                </span>
                <h3 className="text-base font-semibold leading-7 mb-2">
                  {col.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {col.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">
              I ship. You scale. Let&apos;s get to work.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Real systems in production, not slides and demos. A small
              number of engagements, prioritizing long-term partnerships.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link href="/contact">
                  Start a Conversation
                  <span className="ml-2" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-10 text-base font-semibold border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link href="/work">
                  See My Work
                  <span className="ml-2" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export function HomeViews({
  stats,
  contributions,
  totalContributions,
}: HomeViewsProps) {
  const [view, setView] = useState<"professional" | "engineering">(
    "professional"
  )

  return (
    <>
      {/* Hero Section — shared, headline reacts to mode */}
      <section className="py-16 md:py-36">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow-line text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              Ranger Ventures LLC
            </p>

            <Headline mode={view === "professional" ? "strategy" : "engineering"} />

            <p className="text-xl leading-8 text-muted-foreground max-w-2xl mb-10">
              I build AI-powered tools and middleware for teams that already
              know AI matters. No evangelism, no PowerPoints &mdash; just
              code and strategy that ship.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link href="/contact">
                  Start a Conversation
                  <span className="ml-2" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-10 text-base font-semibold border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link href="/work">
                  See My Work
                  <span className="ml-2" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* View toggle */}
      <ViewToggle
        view={view}
        onToggle={() =>
          setView(view === "professional" ? "engineering" : "professional")
        }
      />

      {/* Conditional view */}
      {view === "professional" ? (
        <ProfessionalView />
      ) : (
        <EngineeringView
          stats={stats}
          contributions={contributions}
          totalContributions={totalContributions}
        />
      )}
    </>
  )
}
