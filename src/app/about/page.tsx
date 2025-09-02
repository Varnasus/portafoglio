import { Container } from "@/components/ui/container"
import { siteConfig } from "@/lib/site"

export const metadata = {
  title: "About Zach Varney",
  description: "Learn about Zach Varney's background, expertise, and approach to AI product management.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              About Zach Varney
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              AI Technical Product Manager with 5+ years building LLM-powered products that actually work.
            </p>
          </div>
        </Container>
      </section>

      {/* Bio Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-8">
                I&apos;m Zach Varney, an AI Technical Product Manager who specializes in building and shipping 
                LLM-powered applications that deliver real business value. With over 5 years of experience 
                in AI product development, I&apos;ve learned that the key to successful AI products isn&apos;t just 
                about the technology—it&apos;s about understanding user needs, building robust evaluation frameworks, 
                and creating scalable solutions that teams can actually maintain.
              </p>
              <p className="text-lg leading-8">
                My work has focused on building AI systems that process thousands of interactions daily, 
                from document processing platforms that achieve 38% efficiency improvements to multi-agent 
                workflows that auto-resolve 40% of support tickets. I believe in shipping AI products that 
                actually work in production, not just impressive demos.
              </p>
              
              <h2>My Approach</h2>
              <p>
                I believe in a pragmatic approach to AI product development. Too many AI products fail because 
                they focus on the hype rather than the fundamentals. My methodology centers on:
              </p>
              <ul>
                <li><strong>Problem-First Thinking:</strong> Understanding the actual problems users face before applying AI solutions</li>
                <li><strong>Human-in-the-Loop Design:</strong> Building systems that augment human capabilities rather than replace them</li>
                <li><strong>Robust Evaluation:</strong> Creating comprehensive testing frameworks that measure real-world performance, not just demo accuracy</li>
                <li><strong>Cost Optimization:</strong> Implementing intelligent caching, truncation, and model routing to make AI economically viable</li>
                <li><strong>Scalable Architecture:</strong> Designing systems that can grow with your business and handle production loads</li>
                <li><strong>Continuous Monitoring:</strong> Building systems that continuously improve through feedback and performance tracking</li>
              </ul>

              <h2>Technical Expertise</h2>
              <p>
                My technical background spans the full AI product development stack:
              </p>
              <ul>
                <li><strong>LLM Applications:</strong> Building applications with OpenAI, Anthropic, and open-source models</li>
                <li><strong>Agentic Workflows:</strong> Designing multi-agent systems and autonomous workflows</li>
                <li><strong>Evaluation Frameworks:</strong> Creating comprehensive testing and monitoring systems</li>
                <li><strong>Product Strategy:</strong> Developing go-to-market strategies for AI products</li>
                <li><strong>Team Leadership:</strong> Leading cross-functional teams of 5-15 people</li>
              </ul>

              <h2>What I&apos;ve Built</h2>
              <p>
                Throughout my career, I&apos;ve helped companies build AI products that have:
              </p>
              <ul>
                <li><strong>AI Summarization Platform:</strong> Reduced analyst review time by 38% while maintaining SOC-2 compliance and achieving sub-2-second latency</li>
                <li><strong>Brand Compliance System:</strong> Automated checking across 1000+ marketing assets with 85% accuracy and 10x faster review process</li>
                <li><strong>Multi-Agent Support System:</strong> Auto-resolved 40% of support tickets with 2.3x faster first response times and 24/7 automated coverage</li>
                <li><strong>Cost Optimization:</strong> Implemented strategies that reduced AI processing costs by 65% while improving performance by 40%</li>
                <li><strong>Evaluation Frameworks:</strong> Built comprehensive testing systems that measure real-world performance with 85%+ user satisfaction scores</li>
              </ul>

              <h2>My Philosophy</h2>
              <p>
                AI is a tool, not a solution. The most successful AI products I&apos;ve built started with a deep 
                understanding of the problem space and user needs. Only then did we apply AI to solve those 
                problems in ways that traditional software couldn&apos;t.
              </p>
              <p>
                I believe in building AI products that actually work in production, not just impressive demos. 
                This means focusing on reliability, cost-effectiveness, and measurable business outcomes. 
                It means building systems that can handle real-world complexity, edge cases, and scale with 
                your business growth.
              </p>
              <p>
                I&apos;m passionate about helping companies navigate the complex landscape of AI product development, 
                avoiding common pitfalls like over-engineering, ignoring costs, and focusing on hype over 
                practical value. My goal is to help you build AI products that deliver real business value 
                and can be maintained and improved over time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Management</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {siteConfig.expertise.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Technologies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {siteConfig.technologies.map((tech) => (
                    <li key={tech} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 