"use client"

import { useState, useEffect, useCallback, useRef, memo } from "react"
import { SplitFlap, FlapChar } from "clackboard"
import type {
  SplitFlapSize,
  SplitFlapVariant,
  SplitFlapColor,
  SplitFlapEasing,
  SplitFlapMode,
  StaggerDirection,
  SplitFlapLayout,
  Palette,
} from "clackboard"

// ── Ease-in-out helpers ──

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Types ──

interface Config {
  boardWidth: number
  cycleInterval: number
  messages: string[][]
  size: SplitFlapSize
  variant: SplitFlapVariant
  color: SplitFlapColor
  easing: SplitFlapEasing
  mode: SplitFlapMode
  layout: SplitFlapLayout
  flipMs: number
  stagger: number
  staggerDirection: StaggerDirection
  gap: number
  perspective: number
  animateOnMount: boolean
  useCustomPalette: boolean
  palette: Palette
  realisticStagger: boolean
  transitionDuration: number
  easingCurve: "sine" | "cubic"
}

const DEFAULT_MESSAGES: string[][] = [
  ["I BUILD AI TOOLS", "THAT SHIP"],
  ["ARCHITECTURE FIRST", "FAST ITERATION"],
  ["FROM CONCEPT TO", "PRODUCTION CODE"],
  ["CONSULTING AND", "HANDS ON BUILDING"],
  ["YOUR NEXT AI", "SYSTEM STARTS HERE"],
]

const BRASS_PALETTE: Palette = {
  text: "#D4AD52",
  topBg: "#12161A",
  botBg: "#0F1215",
  border: "#222830",
  div: "#1A1E24",
  flapBack: "#0C0F12",
}

const DEFAULT_CONFIG: Config = {
  boardWidth: 18,
  cycleInterval: 10,
  messages: DEFAULT_MESSAGES,
  size: "md",
  variant: "modern",
  color: "dark",
  easing: "decelerate",
  mode: "cascade",
  layout: "board",
  flipMs: 100,
  stagger: 30,
  staggerDirection: "ltr",
  gap: 3,
  perspective: 300,
  animateOnMount: false,
  useCustomPalette: true,
  palette: BRASS_PALETTE,
  realisticStagger: false,
  transitionDuration: 1200,
  easingCurve: "sine",
}

// ── Board renderers ──
// These take a `snapshot` of config so they only re-render when
// we explicitly pass a new snapshot (on flip), not on every slider tick.

function RealisticBoard({
  rows,
  length,
  config,
}: {
  rows: string[]
  length: number
  config: Config
}) {
  const totalChars = rows.length * length
  const easeFn =
    config.easingCurve === "cubic" ? easeInOutCubic : easeInOutSine

  // Stable delay map — only reshuffled when rows content changes
  const delayMapRef = useRef<number[]>([])
  const prevRowsRef = useRef("")
  const rowsKey = rows.join("|")

  if (prevRowsRef.current !== rowsKey) {
    prevRowsRef.current = rowsKey
    const indices = Array.from({ length: totalChars }, (_, i) => i)
    const shuffled = shuffle(indices)
    const delays = new Array(totalChars).fill(0)
    shuffled.forEach((charIndex, orderPosition) => {
      const t = totalChars <= 1 ? 0 : orderPosition / (totalChars - 1)
      delays[charIndex] = Math.round(easeFn(t) * config.transitionDuration)
    })
    delayMapRef.current = delays
  }

  const delayMap = delayMapRef.current

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `${config.gap}px` }}>
      {rows.map((row, rowIdx) => {
        const padded = row.padEnd(length).slice(0, length)
        return (
          <div key={rowIdx} style={{ display: "flex", gap: `${config.gap}px` }}>
            {padded.split("").map((char, colIdx) => {
              const flatIdx = rowIdx * length + colIdx
              return (
                <FlapChar
                  key={`${rowIdx}-${colIdx}`}
                  target={char}
                  flipMs={config.flipMs}
                  delay={delayMap[flatIdx] ?? 0}
                  size={config.size}
                  variant={config.variant}
                  easing={config.easing}
                  perspective={config.perspective}
                  {...(config.useCustomPalette
                    ? { palette: config.palette }
                    : { color: config.color })}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const StandardBoard = memo(function StandardBoard({
  rows,
  length,
  config,
}: {
  rows: string[]
  length: number
  config: Config
}) {
  return (
    <SplitFlap
      layout={config.layout}
      rows={rows}
      length={length}
      size={config.size}
      variant={config.variant}
      {...(config.useCustomPalette
        ? { palette: config.palette }
        : { color: config.color })}
      easing={config.easing}
      mode={config.mode}
      flipMs={config.flipMs}
      stagger={config.stagger}
      staggerDirection={config.staggerDirection}
      gap={config.gap}
      perspective={config.perspective}
      animateOnMount={config.animateOnMount}
    />
  )
})

// ── Small UI components ──

function Hint({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative flex-shrink-0">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow((s) => !s)}
        className="w-3.5 h-3.5 rounded-full border border-border text-[8px] text-muted-foreground hover:text-foreground hover:border-primary/40 flex items-center justify-center leading-none"
      >?</button>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 rounded bg-popover border border-border text-[10px] text-popover-foreground leading-relaxed z-10 shadow-lg">
          {text}
        </span>
      )}
    </span>
  )
}

function Slider({
  label, value, min, max, step, onChange, hint,
}: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; hint?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] font-mono text-muted-foreground w-28 flex-shrink-0 flex items-center gap-1">
        {label}{hint && <Hint text={hint} />}
      </label>
      <input type="range" min={min} max={max} step={step ?? 1} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="flex-1 h-1 accent-primary" />
      <span className="text-[10px] font-mono text-foreground w-10 text-right">{value}</span>
    </div>
  )
}

function Select<T extends string>({
  label, value, options, onChange, hint,
}: {
  label: string; value: T; options: T[]; onChange: (v: T) => void; hint?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] font-mono text-muted-foreground w-28 flex-shrink-0 flex items-center gap-1">
        {label}{hint && <Hint text={hint} />}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value as T)}
        className="flex-1 text-[11px] font-mono bg-background border border-border rounded px-2 py-1 text-foreground">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  )
}

function Toggle({
  label, value, onChange, hint,
}: {
  label: string; value: boolean; onChange: (v: boolean) => void; hint?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] font-mono text-muted-foreground w-28 flex-shrink-0 flex items-center gap-1">
        {label}{hint && <Hint text={hint} />}
      </label>
      <button onClick={() => onChange(!value)}
        className={`w-8 h-4 rounded-full transition-colors ${value ? "bg-primary" : "bg-border"} relative`}>
        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-foreground transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  )
}

function ColorInput({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] font-mono text-muted-foreground w-28 flex-shrink-0">{label}</label>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-6 h-5 border-0 p-0 cursor-pointer" />
      <span className="text-[10px] font-mono text-muted-foreground">{value}</span>
    </div>
  )
}

// ── Export config as code ──

function configToCode(config: Config): string {
  const lines: string[] = []

  if (config.realisticStagger) {
    lines.push(`// Realistic board stagger`)
    lines.push(`// transitionDuration: ${config.transitionDuration}ms`)
    lines.push(`// easingCurve: "${config.easingCurve}"`)
    lines.push(`// Shuffled order with ease-in-out delay distribution`)
    lines.push(``)
  }

  lines.push(`<SplitFlap`)
  lines.push(`  layout="${config.layout}"`)
  lines.push(`  rows={currentBoard}`)
  lines.push(`  length={${config.boardWidth}}`)
  lines.push(`  size="${config.size}"`)
  lines.push(`  variant="${config.variant}"`)

  if (config.useCustomPalette) {
    lines.push(`  palette={{`)
    lines.push(`    text: "${config.palette.text}",`)
    lines.push(`    topBg: "${config.palette.topBg}",`)
    lines.push(`    botBg: "${config.palette.botBg}",`)
    lines.push(`    border: "${config.palette.border}",`)
    lines.push(`    div: "${config.palette.div}",`)
    if (config.palette.flapBack) lines.push(`    flapBack: "${config.palette.flapBack}",`)
    lines.push(`  }}`)
  } else {
    lines.push(`  color="${config.color}"`)
  }

  lines.push(`  easing="${config.easing}"`)
  lines.push(`  mode="${config.mode}"`)
  lines.push(`  flipMs={${config.flipMs}}`)
  lines.push(`  stagger={${config.stagger}}`)
  lines.push(`  staggerDirection="${config.staggerDirection}"`)
  lines.push(`  gap={${config.gap}}`)
  lines.push(`  perspective={${config.perspective}}`)
  if (config.animateOnMount) lines.push(`  animateOnMount`)
  lines.push(`/>`)
  lines.push(``)
  lines.push(`// cycleInterval: ${config.cycleInterval}s`)

  return lines.join("\n")
}

// ── Main component ──

export function DevPanel() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)
  const [msgIndex, setMsgIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [dirty, setDirty] = useState(false)

  // `applied` is the config snapshot the board is actually rendering with.
  // It only updates when we flip, not on every slider tick.
  const [applied, setApplied] = useState<Config>(DEFAULT_CONFIG)

  const patch = useCallback(
    <K extends keyof Config>(key: K, val: Config[K]) => {
      setConfig((c) => ({ ...c, [key]: val }))
      setDirty(true)
    },
    []
  )

  const patchPalette = useCallback(
    (key: keyof Palette, val: string) => {
      setConfig((c) => ({ ...c, palette: { ...c.palette, [key]: val } }))
      setDirty(true)
    },
    []
  )

  // Flip to next message AND apply current config
  const flip = useCallback(() => {
    setMsgIndex((i) => (i + 1) % config.messages.length)
    setApplied({ ...config })
    setDirty(false)
  }, [config])

  // Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => {
        const next = (prev + 1) % config.messages.length
        return next
      })
      setApplied((prev) => ({ ...prev }))

    }, applied.cycleInterval * 1000)
    return () => clearInterval(timer)
  }, [applied.cycleInterval, config.messages.length])

  const currentRows = config.messages[msgIndex]

  const copyConfig = useCallback(() => {
    navigator.clipboard.writeText(configToCode(config))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [config])

  // Ctrl+Shift+D
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[999] w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors text-xs font-mono"
        title="Open dev panel (Ctrl+Shift+D)">
        D
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[998] flex">
      {/* Preview area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background/95 gap-6">
        <div className="overflow-hidden">
          {applied.realisticStagger ? (
            <RealisticBoard rows={currentRows} length={applied.boardWidth} config={applied} />
          ) : (
            <StandardBoard rows={currentRows} length={applied.boardWidth} config={applied} />
          )}
        </div>

        {/* Flip button — always visible */}
        <button onClick={flip}
          className={`px-6 py-2.5 rounded-lg font-mono text-sm transition-all ${
            dirty
              ? "bg-primary text-primary-foreground animate-pulse"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          }`}>
          {dirty ? "Apply & Flip" : "Flip Next"}
        </button>
        {dirty && (
          <span className="text-[10px] font-mono text-primary/60">
            Settings changed — click to preview
          </span>
        )}
      </div>

      {/* Panel */}
      <div className="w-80 bg-card border-l border-border overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-primary tracking-widest">BOARD TUNER</span>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground text-sm">&times;</button>
        </div>

        {/* Board */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">Board</p>
          <Slider label="Width (chars)" value={config.boardWidth} min={10} max={30} onChange={(v) => patch("boardWidth", v)} />
          <Slider label="Cycle (sec)" value={config.cycleInterval} min={3} max={20} onChange={(v) => patch("cycleInterval", v)} />
        </div>

        {/* Display */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">Display</p>
          <Select label="Size" value={config.size} options={["sm", "md", "lg", "xl"]} onChange={(v) => patch("size", v)}
            hint="Physical size of each flap character. sm=30px, md=46px, lg=64px, xl=82px wide." />
          <Select label="Variant" value={config.variant} options={["modern", "classic"]} onChange={(v) => patch("variant", v)}
            hint="modern = clean flat flaps. classic = textured with hinge marks, rivets, and shadows like a real train station board." />
          <Select label="Easing" value={config.easing} options={["linear", "decelerate", "spring"]} onChange={(v) => patch("easing", v)}
            hint="How each flap's flip animation moves. linear = constant speed. decelerate = fast start, slow settle (mechanical inertia). spring = decelerate + bounce at the end." />
          <Slider label="Flip (ms)" value={config.flipMs} min={30} max={300} step={10} onChange={(v) => patch("flipMs", v)}
            hint="How long a single character takes to flip from one letter to the next. Lower = faster individual flips." />
          <Slider label="Gap (px)" value={config.gap} min={0} max={12} onChange={(v) => patch("gap", v)}
            hint="Space between each flap character." />
          <Slider label="Perspective" value={config.perspective} min={100} max={2000} step={50} onChange={(v) => patch("perspective", v)}
            hint="CSS 3D perspective depth. Lower = more dramatic 3D effect on flips. Higher = flatter, more subtle." />
          <Toggle label="Animate mount" value={config.animateOnMount} onChange={(v) => patch("animateOnMount", v)}
            hint="When on, the board flips in from blank when it first appears instead of showing the text statically." />
        </div>

        {/* Stagger */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">Stagger</p>
          <Toggle label="Realistic mode" value={config.realisticStagger} onChange={(v) => patch("realisticStagger", v)}
            hint="Simulates a real airport board. Each flap starts at a random time following an ease-in-out curve — slow start, rapid middle burst, slow finish. Like a real Solari board where flaps seem to fire at random." />
          {config.realisticStagger ? (
            <>
              <Slider label="Duration (ms)" value={config.transitionDuration} min={200} max={4000} step={100} onChange={(v) => patch("transitionDuration", v)}
                hint="Total time window over which all flaps begin their flip. Higher = more spread out, slower overall transition. The ease-in-out curve distributes start times within this window." />
              <Select label="Curve" value={config.easingCurve} options={["sine", "cubic"]} onChange={(v) => patch("easingCurve", v)}
                hint="Shape of the delay distribution. sine = gentle, smooth ramp. cubic = more dramatic contrast between the slow edges and fast middle burst." />
            </>
          ) : (
            <>
              <Select label="Mode" value={config.mode} options={["cascade", "board"]} onChange={(v) => patch("mode", v)}
                hint="cascade = flaps start one after another in sequence (wave effect). board = all flaps spin simultaneously and settle independently." />
              <Slider label="Stagger (ms)" value={config.stagger} min={0} max={150} step={5} onChange={(v) => patch("stagger", v)}
                hint="Delay between each consecutive flap starting its flip. Higher = more visible left-to-right wave. 0 = all start at once." />
              <Select label="Direction" value={config.staggerDirection} options={["ltr", "rtl", "center-out"]} onChange={(v) => patch("staggerDirection", v)}
                hint="Which direction the cascade wave travels. ltr = left to right. rtl = right to left. center-out = starts from the middle and spreads outward." />
            </>
          )}
        </div>

        {/* Palette */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest">Color</p>
          <Toggle label="Custom palette" value={config.useCustomPalette} onChange={(v) => patch("useCustomPalette", v)}
            hint="When on, define exact hex colors for each part of the flap. When off, pick from preset themes." />
          {config.useCustomPalette ? (
            <>
              <ColorInput label="Text" value={config.palette.text} onChange={(v) => patchPalette("text", v)} />
              <ColorInput label="Top BG" value={config.palette.topBg} onChange={(v) => patchPalette("topBg", v)} />
              <ColorInput label="Bottom BG" value={config.palette.botBg} onChange={(v) => patchPalette("botBg", v)} />
              <ColorInput label="Border" value={config.palette.border} onChange={(v) => patchPalette("border", v)} />
              <ColorInput label="Divider" value={config.palette.div} onChange={(v) => patchPalette("div", v)} />
              <ColorInput label="Flap back" value={config.palette.flapBack ?? "#0C0F12"} onChange={(v) => patchPalette("flapBack", v)} />
            </>
          ) : (
            <Select label="Theme" value={config.color} options={["dark", "light", "ranger", "patriot", "red"]} onChange={(v) => patch("color", v)} />
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-border space-y-2">
          <button onClick={copyConfig}
            className="w-full text-xs font-mono py-2 px-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            {copied ? "Copied!" : "Copy Config"}
          </button>
          <button onClick={() => { setConfig(DEFAULT_CONFIG); setDirty(true) }}
            className="w-full text-xs font-mono py-2 px-3 rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
            Reset Defaults
          </button>
        </div>

        <p className="text-[9px] text-muted-foreground/40 font-mono">Ctrl+Shift+D to toggle</p>
      </div>
    </div>
  )
}
