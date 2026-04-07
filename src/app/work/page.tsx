import { Suspense } from "react"
import { Container } from "@/components/ui/container"
import { WorkCard } from "@/components/work-card"
import { ActivityFeed } from "@/components/activity-feed"
import { GitHubStats } from "@/components/github-stats"
import { projects } from "@/lib/projects"

export const metadata = {
  title: "Work",
  description:
    "Client systems, personal infrastructure, and open source. Each project is real — running in production or published for others to use.",
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="text-center animate-pulse">
          <div className="h-8 w-12 bg-muted rounded mx-auto" />
          <div className="h-3 w-16 bg-muted rounded mx-auto mt-2" />
        </div>
      ))}
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
      ))}
    </div>
  )
}

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Selected Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            What I&apos;ve built.
          </h1>
          <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-2xl">
            Client systems, personal infrastructure, and open source. Each
            project is real &mdash; running in production or published for
            others to use.
          </p>

          {/* GitHub Stats */}
          <div className="mb-16 p-6 bg-muted/50 rounded-xl border">
            <Suspense fallback={<StatsSkeleton />}>
              <GitHubStats />
            </Suspense>
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 gap-6 mb-16">
            {sorted.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Recent Activity
            </h2>
            <div className="p-6 bg-background rounded-xl border">
              <Suspense fallback={<FeedSkeleton />}>
                <ActivityFeed />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
