"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PersonSchema } from "@/components/schema"

const experience = [
  {
    title: "Technical Product Manager",
    company: "Lytho",
    period: "Feb 2024 – Present",
    description: "Leading AI-first product initiatives and platform integrations for enterprise content management.",
    achievements: [
      "Turned around a 'trouble' team to deliver structured APIs and Slack/Teams integrations, establishing the foundation for scalable platform connectivity",
      "Drove Lytho's AI-first pivot, conceiving and shipping Insights and Compliance tools. Designed flows such as guideline intake to adapt agents to client-specific rules, enabling customized AI adoption across enterprise accounts",
      "Originated Project Horizon, unifying DivvyHQ workflows into Lytho's ecosystem, mitigating acquisition risk and increasing platform adoption",
      "Co-launched Project Beacon, an innovation track for rapid AI prototyping and user feedback loops outside of traditional company processes",
      "Recognized internally as a constructive challenger and go-to PM after multiple company layoffs, balancing technical rigor with political awareness"
    ]
  },
  {
    title: "Director of Product",
    company: "DivvyHQ",
    period: "Aug 2016 – Feb 2024",
    description: "Advanced from developer to Director of Product, owning strategy and lifecycle across a B2B content platform.",
    achievements: [
      "Championed a data-driven culture, introducing analytics (Pendo) and structured planning that enabled scale with minimal bugs and strong technical debt management",
      "Led global dev teams in the Philippines and Argentina, building high-trust, high-output collaboration across time zones",
      "Delivered enterprise-scale bulk reassignment tools, solving Fortune 500 client turnover challenges. Replaced error-prone manual reassignments (tens of thousands of items per account) with a single-click bulk workflow, achieving 88% adoption overall and 100% adoption among enterprise clients"
    ]
  }
]

const aiProjects = [
  {
    name: "AHVA",
    description: "Modular AI assistant (FastAPI + React) with layered memory + vector search; demoed as enterprise-ready agentic workflow prototype."
  },
  {
    name: "Jarvis Ecosystem",
    description: "Voice + context-aware AI system for proactive task automation and personal assistant functionality."
  },
  {
    name: "Pantry AI (Scanémon precursor)",
    description: "PWA with video-based scanning, real-time feedback learning, and gamified UX."
  },
  {
    name: "AI Toolchain Expertise",
    description: "Extensive hands-on work with GPT-4o, Claude, Gemini, Hugging Face, Ollama, LangChain, FAISS, Chroma."
  }
]

const skills = {
  "Core Competencies": [
    "Product Strategy",
    "AI/LLM Integration", 
    "Agentic Systems",
    "Workflow Automation",
    "End-to-End Product Ownership",
    "API Architecture",
    "Semantic Search",
    "UX/UI Collaboration",
    "Cross-Functional Leadership",
    "Stakeholder Influence",
    "Vision Communication",
    "Durable Execution"
  ],
  "Languages & Frameworks": [
    "Python",
    "JavaScript/TypeScript",
    "FastAPI",
    "React",
    "SQL"
  ],
  "AI/ML Tooling": [
    "OpenAI API",
    "Anthropic",
    "Gemini",
    "LangChain",
    "Hugging Face",
    "FAISS",
    "Chroma"
  ],
  "DevOps & APIs": [
    "Docker",
    "REST APIs",
    "GitHub Actions",
    "OAuth2",
    "JWT"
  ],
  "Analytics & Monitoring": [
    "Pendo",
    "PostHog",
    "GA4",
    "Sentry"
  ],
  "Product Stack": [
    "Jira",
    "Notion",
    "Figma",
    "Asana",
    "Slack",
    "Zapier",
    "Make"
  ]
}

export default function ResumePage() {
  return (
    <>
      <PersonSchema 
        pageType="resume"
        additionalData={{
          "hasOccupation": {
            "@type": "Occupation",
            "name": "AI-driven Product Leader",
            "description": "Product leader with 10+ years building and scaling B2B SaaS, specializing in AI systems and agentic workflows"
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Zach Varney
                </h1>
                <p className="mt-4 text-2xl text-muted-foreground">
                  AI-driven Product Leader
                </p>
                <p className="mt-6 text-lg text-muted-foreground">
                  AI-driven product leader with 10+ years building and scaling B2B SaaS. Known for transforming complex AI systems into intuitive, revenue-driving features. Experienced in integrating LLMs, vector search, and agentic workflows into enterprise-ready platforms. Proven track record of shipping adoption-focused products, leading cross-functional teams, and driving measurable business impact.
                </p>
              </div>
              <Button asChild variant="outline">
                <a href="/zach-varney-resume.pdf" download>
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-8 border-b">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center md:text-left">
              <div>
                <strong>Location:</strong> [City, State]
              </div>
              <div>
                <strong>Phone:</strong> [Phone]
              </div>
              <div>
                <strong>Email:</strong> [Email]
              </div>
              <div>
                <strong>LinkedIn:</strong> [LinkedIn]
              </div>
              <div>
                <strong>Portfolio:</strong> [Portfolio/GitHub]
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Professional Summary */}
      <section className="py-12 border-b">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Professional Summary</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI-driven product leader with 10+ years building and scaling B2B SaaS. Known for transforming complex AI systems into intuitive, revenue-driving features. Experienced in integrating LLMs, vector search, and agentic workflows into enterprise-ready platforms. Proven track record of shipping adoption-focused products, leading cross-functional teams, and driving measurable business impact. Seeking senior AI product strategy role at an innovation-led company.
            </p>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Professional Experience</h2>
            <div className="space-y-12">
              {experience.map((job, index) => (
                <div key={index} className="border-b border-border pb-8 last:border-b-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-lg text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="text-muted-foreground">{job.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Selected AI Projects */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Selected AI Projects</h2>
            <div className="space-y-8">
              {aiProjects.map((project, index) => (
                <div key={index} className="bg-background p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {skillList.map((skill, index) => (
                      <li key={index} className="text-muted-foreground">• {skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to work together?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Let&apos;s discuss how Zach Varney can help you build AI products that actually work.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <a href="/contact">Get in Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/case-studies">View Case Studies</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 