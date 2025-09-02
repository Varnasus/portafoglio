import { Container } from "@/components/ui/container"
import { FAQSchema } from "@/components/schema"

export const metadata = {
  title: "Frequently Asked Questions - Zach Varney",
  description: "Common questions about Zach Varney's AI product management expertise, career, and approach to building AI products that actually work.",
}

const faqData = [
  {
    question: "What products have I built?",
    answer: "I've led the development and launch of products across enterprise and personal projects. At Lytho, I spearheaded Insights, an AI tool that summarizes work items, drafts diagrams, and surfaces meaningful patterns, and Compliance, which enforces brand guidelines with AI-driven detection and actionable tasks. I also drove Slack and Microsoft Teams integrations and helped shape platform-level initiatives like Project Beacon, integrating DivvyHQ workflows into Lytho's broader ecosystem. At DivvyHQ, I guided major UI overhauls, bulk content management features, and built a data-driven culture with analytics tools like Pendo. Outside of work, I've built projects like Scanémon, a gamified card-scanning app, and AHVA, an experimental personal AI assistant with multi-layer memory."
  },
  {
    question: "What is my approach to AI product management?",
    answer: "I believe in being practical first, experimental second. My approach is to identify repeatable, high-value workflows where AI can remove friction, and design systems where humans remain in control but benefit from automation. I'm deliberate about scoping — I'd rather solve a problem deeply than spread thin with overpromises. I also invest heavily in infrastructure and modularity, so teams can iterate quickly without rebuilding foundations. Finally, I focus on cultural adoption, helping organizations not just ship AI, but trust it."
  },
  {
    question: "How do I evaluate AI model performance?",
    answer: "I look at a mix of technical and human-centered measures: Task success rate — can the model consistently complete the workflow? Accuracy vs. hallucination — if it doesn't know, it shouldn't guess. Latency and scalability — fast, reliable responses build user trust. Cost efficiency — every token matters, so optimization is part of the design. User trust and clarity — especially for non-technical users, the model should give confident, understandable answers or ask for clarification."
  },
  {
    question: "What companies have I worked for?",
    answer: "I'm currently a Technical Product Manager at Lytho, where I drive AI innovation, platform integrations, and strategic initiatives. Before that, I spent nearly eight years at DivvyHQ, where I grew from developer into Director of Product, overseeing the full product lifecycle for an enterprise content platform."
  },
  {
    question: "What technologies do I specialize in?",
    answer: "I work across the stack, but I specialize in: Backend: FastAPI, Python, PostgreSQL, Prisma, Firebase, Supabase. Frontend: React, Tailwind, PWA design. AI/ML: LLM orchestration, vector DBs, RAG pipelines, multimodal prompt engineering. Infra & DevOps: Railway, Docker, GitHub Actions, Cursor.ai IDE. Integrations: Slack, Microsoft Teams, iPaaS, Cloudinary, AWS (S3/CloudFront)."
  },
  {
    question: "What's my leadership style?",
    answer: "I'm a hands-on product leader who thrives in tough situations. I've often been placed on 'trouble teams' to stabilize chaos and deliver results — and that's where I do my best work. My style is to challenge assumptions constructively, stay close to the technical details, and work shoulder-to-shoulder with engineers and designers. I balance being a builder, a connector, and a mentor."
  },
  {
    question: "How can they work with me?",
    answer: "The best way to work with me is collaboratively and iteratively. I believe in quick MVP slices, fast feedback loops, and co-creating solutions rather than tossing requirements over a wall. I'm comfortable setting strategy, but I don't hesitate to dive into details to unblock the team."
  },
  {
    question: "What makes me different?",
    answer: "I bring a dual background as both a developer and a product strategist, which means I can bridge vision and execution. I've proven I can shift organizations toward AI-first thinking, not just in theory but through shipped products that people use daily. Unlike many PMs, I also build and launch my own side projects, keeping me sharp and experimental. And through layoffs, pivots, and shifting priorities, I've built a reputation as the go-to PM who delivers when things get hard."
  }
]

export default function FAQPage() {
  return (
    <>
      <FAQSchema questions={faqData} />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Common questions about Zach Varney&apos;s AI product management expertise, career, and approach to building AI products that actually work.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-12">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-border pb-8 last:border-b-0">
                  <h2 className="text-2xl font-semibold mb-4">
                    {faq.question}
                  </h2>
                  <p className="text-lg leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              If you didn&apos;t find the answer you&apos;re looking for, feel free to reach out directly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold shadow-sm hover:bg-accent"
              >
                Learn More About Zach
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 