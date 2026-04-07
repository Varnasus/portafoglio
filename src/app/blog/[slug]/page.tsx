import { notFound } from "next/navigation"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getPostBySlug, getAllPosts } from "@/lib/posts"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15: params is a Promise in generateMetadata
  // But generateStaticParams provides the values at build time
  // We need to handle this synchronously for metadata
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug)
    if (!post) return { title: "Not Found" }
    return {
      title: post.title,
      description: post.description,
    }
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <section className="py-20 md:py-32">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
          >
            &larr; Back to blog
          </Link>

          <header className="mb-12">
            <div className="flex items-baseline gap-4 mb-4">
              <time className="text-xs text-muted-foreground/60 font-mono">
                {post.date}
              </time>
              <div className="flex gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-invert prose-green max-w-none">
            {post.body.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-bold mt-10 mb-4"
                  >
                    {block.replace("## ", "")}
                  </h2>
                )
              }
              if (block.startsWith("- **")) {
                const items = block.split("\n").filter(Boolean)
                return (
                  <ul key={i} className="space-y-3 my-6">
                    {items.map((item, j) => {
                      const match = item.match(/^- \*\*(.+?)\*\* — (.+)$/)
                      if (match) {
                        return (
                          <li
                            key={j}
                            className="text-base leading-7 text-muted-foreground"
                          >
                            <strong className="text-foreground">
                              {match[1]}
                            </strong>{" "}
                            — {match[2]}
                          </li>
                        )
                      }
                      return (
                        <li
                          key={j}
                          className="text-base leading-7 text-muted-foreground"
                        >
                          {item.replace(/^- /, "")}
                        </li>
                      )
                    })}
                  </ul>
                )
              }
              return (
                <p
                  key={i}
                  className="text-base leading-7 text-muted-foreground my-4"
                >
                  {block}
                </p>
              )
            })}
          </div>
        </article>
      </Container>
    </section>
  )
}
