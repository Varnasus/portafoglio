import { getRepos, daysSinceLastPush } from "@/lib/github"

export async function GitHubStats() {
  const repos = await getRepos()

  const totalRepos = repos.length
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const daysSince = daysSinceLastPush(repos)
  const topLanguages = [...new Set(repos.map((r) => r.language).filter(Boolean))].slice(0, 4)

  const stats = [
    { label: "Public Repos", value: String(totalRepos) },
    { label: "Stars", value: String(totalStars) },
    {
      label: "Last Push",
      value: daysSince === 0 ? "Today" : `${daysSince}d ago`,
    },
    { label: "Languages", value: topLanguages.join(", ") || "—" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-2xl font-bold font-mono text-primary">
            {stat.value}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
