import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getMediumPosts } from "@/lib/medium"
import { getAllPosts } from "@/lib/posts"

export const metadata = {
  title: "Blog",
  description:
    "Build logs and notes on AI development, open-source tools, and shipping code.",
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

function ReadArrow() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
      Read
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </span>
  )
}

export default async function BlogPage() {
  const [mediumPosts, localPosts] = await Promise.all([
    getMediumPosts(),
    Promise.resolve(getAllPosts()),
  ])

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

          <div className="space-y-5">
            {/* Medium posts */}
            {mediumPosts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="hover-card block p-6 bg-card rounded-xl border group"
              >
                {/* Header row: Medium icon + date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MediumIcon className="w-5 h-5 text-foreground" />
                    <span className="text-[11px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                      Medium
                    </span>
                  </div>
                  <time className="text-xs text-muted-foreground/50 font-mono">
                    {post.date}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-serif leading-tight">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags + read link */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded-full bg-muted text-muted-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto">
                    <ReadArrow />
                  </span>
                </div>
              </a>
            ))}

            {/* Local posts */}
            {localPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="hover-card block p-6 bg-card rounded-xl border group"
              >
                {/* Header row: site badge + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-primary/60 uppercase tracking-wider">
                    Build Log
                  </span>
                  <time className="text-xs text-muted-foreground/50 font-mono">
                    {post.date}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-serif leading-tight">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {post.description}
                </p>

                {/* Tags + read link */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] rounded-full bg-muted text-muted-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto">
                    <ReadArrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
