"use client"

import { useState, useEffect, useRef } from "react"
import { SplitFlap } from "clackboard"

const BOARD_WIDTH = 18

const STRATEGY_BOARDS = [
  ["I BUILD AI TOOLS", "THAT SHIP"],
  ["ARCHITECTURE FIRST", "FAST ITERATION"],
  ["FROM CONCEPT TO", "PRODUCTION CODE"],
  ["CONSULTING AND", "HANDS ON BUILDING"],
  ["YOUR NEXT AI", "SYSTEM STARTS HERE"],
  ["MIDDLEWARE THAT", "CONNECTS EVERYTHING"],
  ["NOT A DEMO", "A REAL SYSTEM"],
  ["AI STRATEGY IS", "EASY SHIPPING ISNT"],
  ["LESS MEETINGS", "MORE DEPLOYS"],
  ["I READ THE DOCS", "SO YOU DONT HAVE TO"],
  ["BUILT FOR SCALE", "SHIPPED ON TIME"],
  ["ZERO DOWNTIME", "ZERO EXCUSES"],
  ["TRUSTED BY TEAMS", "WHO BUILD WITH AI"],
]

const ENGINEERING_BOARDS = [
  ["GIT PUSH MAIN", "TESTS PASSING"],
  ["NPM PUBLISH", "ZERO DEPENDENCIES"],
  ["BUILT WITH", "CLAUDE CODE"],
  ["PYTHON TYPESCRIPT", "FASTAPI NEXTJS"],
  ["OPEN SOURCE", "MIT LICENSE"],
  ["DOCKER BUILD", "DEPLOY TO PROD"],
  ["PULL REQUEST", "APPROVED MERGED"],
  ["CICD PIPELINE", "ALL GREEN"],
  ["LATENCY UNDER", "FIFTY MS"],
  ["API RESPONSE", "TWO HUNDRED OK"],
  ["BUILT THIS BOARD", "WITH MY OWN PKG"],
  ["YES THIS FLIPS", "NO ITS NOT GIF"],
]

const CYCLE_INTERVAL = 10000

const BRASS_PALETTE = {
  text: "#D4AD52",
  topBg: "#12161A",
  botBg: "#0F1215",
  border: "#222830",
  div: "#1A1E24",
  flapBack: "#0C0F12",
}

function useResponsiveSize(): "sm" | "md" {
  const [size, setSize] = useState<"sm" | "md">("md")

  useEffect(() => {
    function update() {
      setSize(window.innerWidth < 640 ? "sm" : "md")
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return size
}

interface HeadlineProps {
  mode?: "strategy" | "engineering"
}

export function Headline({ mode = "strategy" }: HeadlineProps) {
  const [index, setIndex] = useState(0)
  const size = useResponsiveSize()
  const prevMode = useRef(mode)

  const boards = mode === "engineering" ? ENGINEERING_BOARDS : STRATEGY_BOARDS

  useEffect(() => {
    if (prevMode.current !== mode) {
      setIndex(0)
      prevMode.current = mode
    }
  }, [mode])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % boards.length)
    }, CYCLE_INTERVAL)
    return () => clearInterval(timer)
  }, [boards.length])

  const currentBoard = boards[index]

  return (
    <div className="mb-6 overflow-x-auto -mx-2 px-2">
      <SplitFlap
        layout="board"
        rows={currentBoard}
        length={BOARD_WIDTH}
        size={size}
        variant="classic"
        palette={BRASS_PALETTE}
        easing="decelerate"
        stagger={30}
        staggerDirection="ltr"
        gap={3}
        mode="cascade"
        perspective={300}
        animateOnMount
      />
    </div>
  )
}
