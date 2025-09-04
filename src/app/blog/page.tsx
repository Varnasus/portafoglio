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
  // Add your actual local blog posts here when you have them
  // For now, we'll show only Medium posts
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