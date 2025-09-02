import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArticleSchema } from "@/components/schema"

export const metadata = {
  title: "Case Studies - Zach Varney",
  description: "Real-world AI product case studies by Zach Varney, demonstrating successful implementations of LLM applications and agentic workflows.",
}

const caseStudies = [
  {
    title: "AI Summarization Platform",
    description: "Built a platform that reduces report review time by 38% using advanced LLM techniques and evaluation frameworks.",
    role: "Lead PM",
    company: "Insights Co",
    timeline: "12 weeks",
    teamSize: "7 people",
    metrics: ["38% faster review cycles", "14% support deflection", "<$0.02 per document"],
    technologies: ["OpenAI API", "Python", "React", "AWS"],
    slug: "ai-summarization-platform",
    date: "2024-05-01"
  },
  {
    title: "Brand Compliance AI",
    description: "Automated brand compliance checking across 1000+ assets with 85% accuracy using computer vision and LLM techniques.",
    role: "Senior PM",
    company: "Compliance Inc",
    timeline: "6 weeks",
    teamSize: "5 people",
    metrics: ["85% accuracy", "10x faster review process", "1000+ assets processed"],
    technologies: ["Computer Vision", "OpenAI", "Python", "Docker"],
    slug: "brand-compliance-ai",
    date: "2024-03-15"
  },
  {
    title: "Agentic Workflow Automation",
    description: "Implemented multi-agent system that auto-resolves 40% of support tickets with intelligent routing and response generation.",
    role: "Technical PM",
    company: "Slack Integration",
    timeline: "8 weeks",
    teamSize: "6 people",
    metrics: ["40% ticket auto-resolution", "2.3x faster first response", "60% support reduction"],
    technologies: ["LangChain", "OpenAI", "TypeScript", "Slack API"],
    slug: "agentic-workflow-automation",
    date: "2024-01-20"
  }
]

export default function CaseStudiesPage() {
  return (
    <>
      <ArticleSchema 
        title="AI Product Case Studies - Zach Varney"
        description="Real-world AI product case studies demonstrating successful implementations of LLM applications and agentic workflows."
        date="2024-08-26"
        url="https://zvarney.com/case-studies"
        tags={["AI Product Management", "Case Studies", "LLM Applications", "Agentic Workflows"]}
      />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              AI Product Case Studies
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Real-world examples of AI products Zach Varney has helped build and ship, 
              demonstrating measurable business impact and technical excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <article key={index} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-x-4 text-xs mb-4">
                      <span className="text-muted-foreground">{study.role}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{study.company}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3">
                      <Link href={`/case-studies/${study.slug}`} className="hover:underline">
                        {study.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {study.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{study.timeline}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span className="font-medium">{study.teamSize}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Metrics:</h4>
                      <ul className="space-y-1">
                        {study.metrics.map((metric, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {metric}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {study.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button asChild className="w-full">
                      <Link href={`/case-studies/${study.slug}`}>
                        Read Case Study
                      </Link>
                    </Button>
                  </div>
                </article>
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
              Ready to build your AI product?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              These case studies show Zach Varney&apos;s proven approach to building AI products that deliver real business value.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/timeline">View Career Timeline</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 