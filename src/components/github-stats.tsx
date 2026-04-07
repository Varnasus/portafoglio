"use client"

import SplitFlapDisplay from "react-split-flap-display"
import { NUMERIC } from "react-split-flap-display/constants"
import "../../node_modules/react-split-flap-display/dist/index.css"

interface StatsProps {
  repos: number
  stars: number
  daysSince: number
  contributions: number
}

function StatFlap({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <SplitFlapDisplay
        characterSet={[" ", ...NUMERIC]}
        value={value}
        minLength={value.length}
        fontSize="1.75rem"
        textColor="hsl(135, 50%, 65%)"
        background="hsl(220, 18%, 8%)"
        borderColor="hsl(220, 12%, 16%)"
        borderWidth="1px"
        step={60}
        withSound={false}
      />
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
    </div>
  )
}

export function GitHubStatsClient({ repos, stars, daysSince, contributions }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      <StatFlap value={String(repos)} label="Repos" />
      <StatFlap value={String(stars)} label="Stars" />
      <StatFlap value={daysSince === 0 ? "0" : String(daysSince)} label="Days Since Push" />
      <StatFlap value={String(contributions)} label="Contributions" />
    </div>
  )
}
