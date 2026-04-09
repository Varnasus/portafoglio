import { Container } from "@/components/ui/container"
import { WorkCard } from "@/components/work-card"
import { GitHubStatsClient } from "@/components/github-stats"
import { ContributionGraph } from "@/components/contribution-graph"
import { projects } from "@/lib/projects"
import { getRepos, getGraphQLData, daysSinceLastPush } from "@/lib/github"

export const metadata = {
  title: "Work",
  description:
    "Client systems, personal infrastructure, and open source. Each project is real — running in production or published for others to use.",
}

export default async function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  const [repos, graphql] = await Promise.all([
    getRepos(),
    getGraphQLData(),
  ])

  const { contributions, publicRepos, privateRepos, totalCommits } = graphql
  const daysSince = daysSinceLastPush(repos)

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Selected Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 font-serif">
            What I&apos;ve built.
          </h1>
          <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-2xl">
            Client systems, personal infrastructure, and open source. Each
            project is real &mdash; running in production or published for
            others to use.
          </p>

          {/* Contribution Graph */}
          {contributions.length > 0 && (
            <div className="mb-16">
              <div className="p-6 bg-card rounded-xl border overflow-x-auto">
                <ContributionGraph data={contributions} />
              </div>
            </div>
          )}

          {/* Stats — split-flap counters */}
          <div className="mb-16 p-8 bg-muted/50 rounded-xl border">
            <GitHubStatsClient
              publicRepos={publicRepos}
              privateRepos={privateRepos}
              daysSince={daysSince}
              totalCommits={totalCommits}
            />
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 gap-6">
            {sorted.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
