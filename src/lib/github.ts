const GITHUB_USERNAME = "Varnasus"
const GITHUB_API = "https://api.github.com"

function headers() {
  const h: HeadersInit = { Accept: "application/vnd.github+json" }
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return h
}

// --- Types ---

export interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  created_at: string
  topics: string[]
}

export interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  created_at: string
  payload: {
    action?: string
    size?: number
    commits?: { message: string }[]
    ref?: string
    ref_type?: string
    pull_request?: { number: number; title: string }
    issue?: { number: number; title: string }
  }
}

// --- Fetchers ---

export async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=public`,
    { headers: headers(), next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  return res.json()
}

export async function getActivity(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    { headers: headers(), next: { revalidate: 1800 } }
  )
  if (!res.ok) return []
  return res.json()
}

// --- Helpers ---

export function formatEvent(event: GitHubEvent): string | null {
  const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, "")

  switch (event.type) {
    case "PushEvent": {
      const count = event.payload.size ?? event.payload.commits?.length ?? 0
      return `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${repo}`
    }
    case "PullRequestEvent":
      return `${event.payload.action === "opened" ? "Opened" : "Closed"} PR #${event.payload.pull_request?.number} on ${repo}`
    case "CreateEvent":
      if (event.payload.ref_type === "repository") return `Created ${repo}`
      return `Created ${event.payload.ref_type} ${event.payload.ref ?? ""} on ${repo}`
    case "IssuesEvent":
      return `${event.payload.action === "opened" ? "Opened" : "Closed"} issue #${event.payload.issue?.number} on ${repo}`
    case "DeleteEvent":
      return null // not interesting
    case "WatchEvent":
      return null // starring repos isn't notable
    default:
      return null
  }
}

export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export async function getContributions(): Promise<ContributionDay[]> {
  if (!process.env.GITHUB_TOKEN) {
    // GraphQL API requires auth — return empty if no token
    return []
  }

  const query = `query {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }`

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []

  const json = await res.json()
  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }

  return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: levelMap[d.contributionLevel] ?? 0,
    }))
  )
}

export function daysSinceLastPush(repos: GitHubRepo[]): number {
  if (!repos.length) return 0
  const latest = repos.reduce((a, b) =>
    new Date(a.pushed_at) > new Date(b.pushed_at) ? a : b
  )
  return Math.floor(
    (Date.now() - new Date(latest.pushed_at).getTime()) / (1000 * 60 * 60 * 24)
  )
}
