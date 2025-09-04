import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema"
import { SocialShareButtons } from "@/components/social-sharing"
import { Search } from "@/components/search"
import { generateSocialMetaTags } from "@/components/social-sharing"
import { BlogPost } from "@/lib/types"
import { BlogPosts } from "@/components/blog-posts"

export const metadata = {
  title: "Blog - Zach Varney",
  description: "Insights and thoughts on AI product management, LLM applications, and building AI products that actually work by Zach Varney.",
  openGraph: {
    title: "AI Product Management Blog - Zach Varney",
    description: "Insights and thoughts on AI product management, LLM applications, and building AI products that actually work.",
    type: "website",
    url: "https://zvarney.com/blog",
    images: [
      {
        url: "https://zvarney.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Product Management Blog - Zach Varney"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Management Blog - Zach Varney",
    description: "Insights and thoughts on AI product management, LLM applications, and building AI products that actually work.",
    images: ["https://zvarney.com/og-image.jpg"]
  }
}

// Local blog posts (existing content)
const localBlogPosts: BlogPost[] = [
  {
    title: "Shifting from Hype to Shipping: AI Agents that Actually Work",
    description: "How to move beyond AI demos and build agentic workflows that deliver real business value in production environments.",
    date: "2024-08-15",
    readTime: "8 min read",
    tags: ["AI Agents", "Product Strategy", "Production"],
    slug: "ai-agents-that-actually-work",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    source: "local"
  },
  {
    title: "Agent Evaluation: Task Success Over Demos",
    description: "Why traditional demo-based evaluation fails for AI agents and how to build comprehensive testing frameworks.",
    date: "2024-07-20",
    readTime: "6 min read",
    tags: ["Evaluation", "Testing", "AI Agents"],
    slug: "agent-evaluation-task-success",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    source: "local"
  },
  {
    title: "Cost Control for AI Products: Caching, Truncation, and Model Routing",
    description: "Practical strategies for managing AI product costs while maintaining performance and user experience.",
    date: "2024-06-10",
    readTime: "10 min read",
    tags: ["Cost Optimization", "Performance", "LLM"],
    slug: "cost-control-ai-products",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop",
    source: "local"
  },
  {
    title: "The PM's Guide to LLM Evaluation Frameworks",
    description: "A comprehensive guide to building evaluation frameworks that measure real-world LLM performance.",
    date: "2024-05-25",
    readTime: "12 min read",
    tags: ["Evaluation", "LLM", "Frameworks"],
    slug: "pm-guide-llm-evaluation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    source: "local"
  },
  {
    title: "Building Agentic Workflows: When to Use Multiple Models",
    description: "Strategic decisions for choosing between single-model and multi-model architectures in agentic systems.",
    date: "2024-04-15",
    readTime: "7 min read",
    tags: ["Agentic Workflows", "Architecture", "Multi-Model"],
    slug: "agentic-workflows-multiple-models",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    source: "local"
  }
]

export default function BlogPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://zvarney.com' },
    { name: 'Blog', url: 'https://zvarney.com/blog' }
  ];

  return (
    <>
      <ArticleSchema 
        title="AI Product Management Blog - Zach Varney"
        description="Insights and thoughts on AI product management, LLM applications, and building AI products that actually work."
        date="2024-08-26"
        url="https://zvarney.com/blog"
        tags={["AI Product Management", "Blog", "LLM Applications", "Agentic Workflows"]}
        image="https://zvarney.com/og-image.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              AI Product Management Blog
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Insights and thoughts on building AI products that actually work, 
              from Zach Varney&apos;s experience in LLM applications and agentic workflows.
            </p>
            
            {/* Social Share Buttons */}
            <div className="mt-8 flex justify-center">
              <SocialShareButtons
                url="https://zvarney.com/blog"
                title="AI Product Management Blog - Zach Varney"
                description="Insights and thoughts on AI product management, LLM applications, and building AI products that actually work."
                hashtags={['AI', 'ProductManagement', 'LLM', 'Blog']}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-muted/30">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-6">Search Articles</h2>
            <Search />
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <BlogPosts localPosts={localBlogPosts} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get the latest insights on AI product management and LLM applications from Zach Varney.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 