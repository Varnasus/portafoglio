"use client"

import { ActivityCalendar } from "react-activity-calendar"
import type { ContributionDay } from "@/lib/github"

const THEME = {
  dark: ["hsl(220, 18%, 10%)", "hsl(135, 30%, 20%)", "hsl(135, 35%, 30%)", "hsl(135, 40%, 40%)", "hsl(135, 50%, 55%)"],
}

export function ContributionGraph({ data }: { data: ContributionDay[] }) {
  if (!data.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Add a GITHUB_TOKEN to display the contribution graph.
      </p>
    )
  }

  return (
    <ActivityCalendar
      data={data}
      theme={THEME}
      colorScheme="dark"
      blockSize={12}
      blockMargin={3}
      fontSize={12}
      showWeekdayLabels={["mon", "wed", "fri"]}
    />
  )
}
