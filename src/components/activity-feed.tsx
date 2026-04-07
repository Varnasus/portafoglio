import { getActivity, formatEvent, timeAgo } from "@/lib/github"

export async function ActivityFeed() {
  const events = await getActivity()

  const items = events
    .map((e) => {
      const text = formatEvent(e)
      if (!text) return null
      return { id: e.id, text, time: timeAgo(e.created_at) }
    })
    .filter(Boolean)
    .slice(0, 8)

  if (!items.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No recent activity to show.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item!.id} className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-muted-foreground truncate">
            {item!.text}
          </span>
          <span className="text-xs text-muted-foreground/60 whitespace-nowrap font-mono">
            {item!.time}
          </span>
        </li>
      ))}
    </ul>
  )
}
