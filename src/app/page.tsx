import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Headline } from "@/components/headline"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              Ranger Ventures LLC
            </p>

            <Headline />

            <p className="text-xl leading-8 text-muted-foreground max-w-2xl mb-10">
              I build AI-powered tools and ship production code. Contracting, consulting,
              and hands-on development for teams that need AI done right.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">See My Work &rarr;</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What I Do */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-none grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                tag: "HANDS-ON DEVELOPMENT",
                title: "AI Development",
                body: "Custom AI tools, agents, and integrations. I build the middleware that connects LLMs to the systems your team already uses \u2014 Slack, internal platforms, APIs.",
              },
              {
                tag: "STRATEGY & ARCHITECTURE",
                title: "Technical Consulting",
                body: "Architecture reviews, implementation planning, and strategy for teams building with AI. I\u2019ve shipped enough systems to know what works and what doesn\u2019t.",
              },
              {
                tag: "COMMUNITY",
                title: "Open Source",
                body: "NPM packages, public tools, and community contributions. Everything I build is designed to be reused \u2014 by clients, by other developers, or by me on the next project.",
              },
            ].map((col) => (
              <div key={col.title} className="flex flex-col p-6 bg-background rounded-xl border">
                <span className="text-xs font-bold tracking-widest uppercase text-primary mb-3 font-mono">
                  {col.tag}
                </span>
                <h3 className="text-lg font-semibold leading-7 mb-3">{col.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{col.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof Strip */}
      <section className="py-12 border-y">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "10+ Years in B2B SaaS",
              "Production AI Systems Live",
              "Builder & Founder",
              "Kansas City, MO \u00b7 Remote",
            ].map((point) => (
              <p key={point} className="text-sm font-medium text-muted-foreground font-mono tracking-tight">
                {point}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Have an AI problem that needs solving?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              I take on a small number of engagements and prioritize long-term partnerships.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
