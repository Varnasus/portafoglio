"use client"

import { SplitFlap } from "clackboard"

export interface StatsProps {
  publicRepos: number
  privateRepos: number
  daysSince: number
  totalCommits: number
}

const BRASS_PALETTE = {
  text: "#D4AD52",
  topBg: "#12161A",
  botBg: "#0F1215",
  border: "#222830",
  div: "#1A1E24",
  flapBack: "#0C0F12",
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function StatFlap({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <SplitFlap
        value={value}
        length={value.length}
        size="md"
        palette={BRASS_PALETTE}
        easing="decelerate"
        stagger={50}
        chars={[" ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
      />
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
    </div>
  )
}

export function GitHubStatsClient({ publicRepos, privateRepos, daysSince, totalCommits }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      <StatFlap value={pad2(publicRepos)} label="Public Repos" />
      <StatFlap value={pad2(privateRepos)} label="Private Repos" />
      <StatFlap value={pad2(daysSince)} label="Days Since Push" />
      <StatFlap value={pad2(totalCommits)} label="Commits" />
    </div>
  )
}
