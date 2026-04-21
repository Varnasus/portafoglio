"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { SplitFlap, resumeAudio } from "clackboard"
import { Volume2, VolumeX } from "lucide-react"

// Desktop: 18 columns wide, full-length phrases.
// Mobile: 7 columns wide, short-form phrases tailored to the width.
// Both viewports render tiles at md size so the flaps stay visually
// consistent — mobile just has a narrower board with tighter copy.
const DESKTOP_BOARD_WIDTH = 18
const MOBILE_BOARD_WIDTH = 7

// Clackboard "md" tile dimensions (from the package source):
//   tile: 46 × 64, gap between tiles: 3, row gap: gap * 2 = 6
// 4 rows: blank margin + 2 text + blank margin.
// Desktop board width: 18 * 46 + 17 * 3 = 879px.
// Mobile board width:   7 * 46 +  6 * 3 = 340px.
const BOARD_HEIGHT = 4 * 64 + 3 * 6 // 274

// Center a string inside a fixed-width row with leading/trailing spaces
// so it sits visually in the middle of the board.
function centerPad(text: string, width: number): string {
  const trimmed = text.slice(0, width)
  const leading = Math.floor((width - trimmed.length) / 2)
  const trailing = width - trimmed.length - leading
  return " ".repeat(leading) + trimmed + " ".repeat(trailing)
}

// Wrap a 2-row message in a 4-row board: blank top, text, text, blank
// bottom. Top/bottom blank rows act as "margin" flaps so the message
// reads as if it's centered inside a real departure board.
function buildBoard(rows: readonly [string, string], width: number): string[] {
  const blank = " ".repeat(width)
  return [
    blank,
    centerPad(rows[0], width),
    centerPad(rows[1], width),
    blank,
  ]
}

type Board = readonly [string, string]

// Desktop boards — 18 columns wide. Sci-fi cameos at indices 4, 9, 14, 19.
const STRATEGY_BOARDS_DESKTOP: Board[] = [
  ["AI BUILDER", "PROBLEM SOLVER"],
  ["YOURE CONVINCED", "TIME TO BUILD"],
  ["AI IS A TOOL", "NOT A STRATEGY"],
  ["CRAFTSMAN", "OVER WAND"],
  ["USE THE SOURCE", "LUKE"],
  ["REUSE THE WHEEL", "SHIP THE CAR"],
  ["NO POWERPOINTS", "JUST DEPLOYS"],
  ["THE CEILING", "DOESNT EXIST"],
  ["NOT A DEMO", "A REAL SYSTEM"],
  ["DONT PANIC", "BRING A TOWEL"],
  ["ONE MAN TEAM", "MOVES LIKE A SQUAD"],
  ["FIND WHATS BROKEN", "FIX IT FAST"],
  ["MIDDLEWARE", "CONNECTS IT ALL"],
  ["BUILT FOR", "PRODUCTION"],
  ["RESISTANCE", "IS FUTILE"],
  ["I SHIP", "YOU SCALE"],
  ["SHOW DONT TELL", "SHIP DONT PITCH"],
  ["YOURE LOOKING", "AT THE PROOF"],
  ["READY TO MOVE", "LETS BUILD"],
  ["ILL BE BACK", "COMPILING"],
]

const ENGINEERING_BOARDS_DESKTOP: Board[] = [
  ["GIT PUSH MAIN", "TESTS PASSING"],
  ["NPM PUBLISH", "ZERO DEPS"],
  ["BUILT WITH", "CLAUDE CODE"],
  ["PYTHON TS", "FASTAPI NEXT"],
  ["HELLO WORLD", "BOOT SEQUENCE"],
  ["DOCKER BUILD", "DEPLOY TO PROD"],
  ["PULL REQUEST", "APPROVED MERGED"],
  ["CICD PIPELINE", "ALL GREEN"],
  ["LATENCY", "UNDER FIFTY MS"],
  ["THESE ARENT", "THE BUGS YOU SEEK"],
  ["API RESPONSE", "TWO HUNDRED OK"],
  ["BUILT THIS BOARD", "AS MY NPM PKG"],
  ["YES THIS FLIPS", "NO ITS NOT GIF"],
  ["OPEN SOURCE", "MIT LICENSE"],
  ["SET PHASERS", "TO SHIP"],
  ["PRODUCTION", "NOT A DEMO"],
  ["TYPED TESTED", "SHIPPED"],
  ["MAIN BRANCH", "NEVER BROKEN"],
  ["VERSION BUMP", "CHANGELOG DONE"],
  ["WAKE UP NEO", "PRESS DEPLOY"],
]

// Mobile boards — 7 columns wide. Same sci-fi cadence, tighter copy.
const STRATEGY_BOARDS_MOBILE: Board[] = [
  ["BUILDER", "SOLVER"],
  ["BUILD", "NOW"],
  ["AI IS", "A TOOL"],
  ["CRAFT", "OVER AI"],
  ["USE", "SOURCE"],
  ["REUSE", "WHEELS"],
  ["NO PPT", "SHIP IT"],
  ["NO", "CEILING"],
  ["REAL", "SYSTEM"],
  ["DONT", "PANIC"],
  ["ONE", "SQUAD"],
  ["FIND", "FIX IT"],
  ["LINKS", "SYSTEMS"],
  ["BUILT", "TO SHIP"],
  ["PHASERS", "TO SHIP"],
  ["I SHIP", "U SCALE"],
  ["SHOW", "PROVE"],
  ["THE", "PROOF"],
  ["LETS", "BUILD"],
  ["ILL BE", "BACK"],
]

const ENGINEERING_BOARDS_MOBILE: Board[] = [
  ["PUSH", "PASSING"],
  ["NPM", "ZERO"],
  ["BUILT", "CLAUDE"],
  ["PY TS", "NEXTJS"],
  ["HELLO", "WORLD"],
  ["DOCKER", "DEPLOY"],
  ["MERGED", "TO MAIN"],
  ["CICD", "GREEN"],
  ["UNDER", "50 MS"],
  ["NOT THE", "BUGS"],
  ["API 200", "OK"],
  ["MY NPM", "PKG"],
  ["FLIPS", "NOT GIF"],
  ["OPEN", "SOURCE"],
  ["PHASERS", "TO SHIP"],
  ["PROD", "NO DEMO"],
  ["TYPED", "TESTED"],
  ["MAIN", "NEVER"],
  ["VERSION", "BUMPED"],
  ["NEO", "DEPLOY"],
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

interface HeadlineProps {
  mode?: "strategy" | "engineering"
}

export function Headline({ mode = "strategy" }: HeadlineProps) {
  const [index, setIndex] = useState(0)
  const prevMode = useRef(mode)

  // These states all start at their SSR-safe defaults.
  // A single consolidated mount-useEffect resolves them together and
  // flips `ready` last, so SplitFlap mounts exactly once with final
  // props. Any prop change during its initial cascade would cause
  // clackboard's internal effect to re-run, clear its in-flight
  // setTimeouts, and silently abort every char with delay>0 because
  // its `ut.current` ref is already set to the target.
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [muted, setMuted] = useState(true)

  // Single mount-time resolve: viewport only. Mute state is
  // intentionally NOT restored from localStorage — every visit starts
  // muted so nobody is surprised by autoplay audio. If a visitor
  // clicked "Sound on" last session, they re-opt in this session.
  //
  // matchMedia is used instead of window.innerWidth because some iOS
  // WKWebViews (e.g. Facebook's in-app browser) briefly report the
  // layout viewport (~980px) at mount, then never fire a resize event
  // to correct it. matchMedia evaluates against the same CSS viewport
  // Tailwind's `sm:` breakpoint uses, and its `change` event fires if
  // the match flips later.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)")
    setIsMobile(mql.matches)
    setReady(true)
    function update(e: MediaQueryListEvent) {
      setIsMobile(e.matches)
    }
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  const boards = isMobile
    ? mode === "engineering"
      ? ENGINEERING_BOARDS_MOBILE
      : STRATEGY_BOARDS_MOBILE
    : mode === "engineering"
      ? ENGINEERING_BOARDS_DESKTOP
      : STRATEGY_BOARDS_DESKTOP

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

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      if (!next) {
        // Unmuting is a user gesture — unlock iOS/Safari AudioContext.
        try {
          resumeAudio()
        } catch {
          // ignore
        }
      }
      return next
    })
    // No remount on mute toggle — we want the visual cascade to keep
    // playing uninterrupted. Any flips already in-flight will finish
    // with their queued sound value (clackboard captures it in
    // per-flip closures), but every new cascade after this render
    // picks up the updated prop. Brief audio bleed is preferred over
    // a disruptive restart.
  }, [])

  const boardWidth = isMobile ? MOBILE_BOARD_WIDTH : DESKTOP_BOARD_WIDTH
  const currentBoard = boards[index] ?? boards[0]
  const paddedRows = buildBoard(currentBoard, boardWidth)

  // Both viewports use md tiles. Mobile gets a narrower board
  // (7 cols vs 18) and its own short-form phrase set.
  const size = "md" as const

  // Key includes isMobile so a viewport swap cleanly remounts at the
  // new width — the mobile first-flap bug fix is preserved, and mute
  // toggles still don't restart the cascade.
  const splitFlapKey = isMobile ? "m" : "d"

  // Readable sentence for screen readers — clackboard captures its
  // own aria-label once on mount and doesn't re-announce when rows
  // change, so we own the announcement ourselves via a sibling
  // sr-only live region below.
  const announcement = `${currentBoard[0]}. ${currentBoard[1]}.`

  return (
    <div className="mb-6">
      <div className="-mx-2 px-2 flex justify-center [overflow-x:clip]" aria-hidden="true">
        {ready ? (
          <SplitFlap
            key={splitFlapKey}
            layout="board"
            rows={paddedRows}
            length={boardWidth}
            rowCount={4}
            size={size}
            variant="classic"
            palette={BRASS_PALETTE}
            easing="decelerate"
            stagger={20}
            staggerDirection="ltr"
            gap={3}
            mode="cascade"
            perspective={300}
            animateOnMount
            sound={!muted}
            volume={0.35}
            soundVariant="clack"
          />
        ) : (
          // Reserved space that matches the real footprint on each
          // viewport so there's no layout jump when SplitFlap mounts.
          // Hardcoded literals because Tailwind can't extract classes
          // from template strings.
          <div
            style={{ height: `${BOARD_HEIGHT}px` }}
            className="w-[340px] sm:w-[879px] sm:max-w-full"
          />
        )}
      </div>

      {/* Screen-reader-only live region. Announces the current board
          whenever `index` flips, since the visual SplitFlap is
          aria-hidden. */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={toggleMute}
          disabled={!ready}
          aria-pressed={!muted}
          aria-label={muted ? "Unmute split-flap sound" : "Mute split-flap sound"}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {muted ? (
            <>
              <VolumeX className="h-3.5 w-3.5" aria-hidden />
              <span>Sound off</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3.5 w-3.5" aria-hidden />
              <span>Sound on</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
