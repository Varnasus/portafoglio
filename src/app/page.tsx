import { HomeViews } from "@/components/home-views"
import { DevPanel } from "@/components/dev-panel"
import { getRepos, getGraphQLData, daysSinceLastPush } from "@/lib/github"

export const metadata = {
  title: "AI Builder & Founder",
  description:
    "Zach Varney builds AI-powered tools and middleware for teams that already know AI matters. Ranger Ventures LLC.",
}

export default async function Home() {
  const [repos, graphql] = await Promise.all([
    getRepos(),
    getGraphQLData(),
  ])

  const { contributions, publicRepos, privateRepos, totalCommits } = graphql
  const daysSince = daysSinceLastPush(repos)

  // Total contributions for display
  const totalContributions = contributions.reduce(
    (sum, d) => sum + d.count, 0
  )

  return (
    <>
      <HomeViews
        stats={{ publicRepos, privateRepos, daysSince, totalCommits }}
        contributions={contributions}
        totalContributions={totalContributions}
      />
      {process.env.NODE_ENV === "development" && <DevPanel />}
    </>
  )
}
