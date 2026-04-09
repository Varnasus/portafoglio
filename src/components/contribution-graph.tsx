"use client"

import { ActivityCalendar } from "react-activity-calendar"
import type { ContributionDay } from "@/lib/github"

const THEME = {
  dark: ["hsl(210, 12%, 10%)", "hsl(40, 30%, 20%)", "hsl(40, 40%, 30%)", "hsl(40, 50%, 40%)", "hsl(40, 54%, 52%)"],
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
