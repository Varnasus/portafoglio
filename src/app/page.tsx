import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              AI Technical Product Manager
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I help companies build and ship AI products that actually work. 
              Specializing in LLM applications, agentic workflows, and scalable AI solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What I Do
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From product discovery to deployment, I help teams navigate the complex world of AI product development.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "AI Product Strategy",
                  description: "Define product vision, technical strategy, and go-to-market plans for AI-powered applications.",
                },
                {
                  name: "LLM Application Development",
                  description: "Design and build scalable LLM applications with proper evaluation frameworks and monitoring.",
                },
                {
                  name: "Team Leadership",
                  description: "Lead cross-functional teams of engineers, designers, and stakeholders to ship AI products.",
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Recent Work Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Recent Work
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Here are some of the AI products I&apos;ve helped build and ship.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: "AI Summarization Platform",
                description: "Built a platform that reduces report review time by 38% using advanced LLM techniques.",
                role: "Lead PM",
                company: "Insights Co",
                link: "/case-studies/insights-ai-summarization-platform",
              },
              {
                title: "Brand Compliance AI",
                description: "Automated brand compliance checking across 1000+ assets with 85% accuracy.",
                role: "Senior PM",
                company: "Compliance Inc",
                link: "/case-studies/compliance-brand-guide-enforcement",
              },
              {
                title: "Agentic Workflow Automation",
                description: "Implemented multi-agent system that auto-resolves 40% of support tickets.",
                role: "Technical PM",
                company: "Slack Integration",
                link: "/case-studies/slack-integration-agentic-workflow-automation",
              },
            ].map((project) => (
              <article key={project.title} className="flex flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time className="text-muted-foreground">{project.role}</time>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{project.company}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6">
                    <Link href={project.link} className="hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button asChild variant="outline">
              <Link href="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Stay Updated on AI Product Management
            </h2>
            <p className="text-lg leading-8 text-muted-foreground mb-8">
              Get insights on building AI products that actually work, delivered to your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build your AI product?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Let&apos;s discuss how I can help you ship AI products that actually work.
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
