import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Blog",
  description:
    "Build logs and notes on AI development, open-source tools, and shipping code.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Blog
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 font-serif">
            Build logs.
          </h1>
          <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-2xl">
            Notes on what I&apos;m building, how it works, and what I learned
            along the way.
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="hover-card block p-6 bg-background rounded-xl border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <time className="text-xs text-muted-foreground/60 font-mono whitespace-nowrap">
                    {post.date}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
