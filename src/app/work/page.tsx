import { Container } from "@/components/ui/container"
import { WorkCard } from "@/components/work-card"
import { GitHubStatsClient } from "@/components/github-stats"
import { ContributionGraph } from "@/components/contribution-graph"
import { projects } from "@/lib/projects"
import { getRepos, getContributions, daysSinceLastPush } from "@/lib/github"

export const metadata = {
  title: "Work",
  description:
    "Client systems, personal infrastructure, and open source. Each project is real — running in production or published for others to use.",
}

export default async function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  const [repos, contributions] = await Promise.all([
    getRepos(),
    getContributions(),
  ])

  const totalRepos = repos.length
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const daysSince = daysSinceLastPush(repos)
  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0)

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

          {/* Stats — split-flap counters */}
          <div className="mb-16 p-8 bg-muted/50 rounded-xl border">
            <GitHubStatsClient
              repos={totalRepos}
              stars={totalStars}
              daysSince={daysSince}
              contributions={totalContributions}
            />
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 gap-6 mb-16">
            {sorted.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>

          {/* Contribution Graph */}
          {contributions.length > 0 && (
            <div>
              <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Contributions
              </h2>
              <div className="p-6 bg-background rounded-xl border overflow-x-auto">
                <ContributionGraph data={contributions} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
