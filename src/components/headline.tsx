"use client"

import { useState, useEffect } from "react"
import SplitFlapDisplay from "react-split-flap-display"
import { ALPHA, PUNCTUATION } from "react-split-flap-display/constants"
import "../../node_modules/react-split-flap-display/dist/index.css"

const MESSAGES = [
  "AI SOLUTIONS",
  "SHIPPING CODE",
  "NPM PACKAGES",
  "OPEN SOURCE",
  "YOUR BUILDER",
]

const CHARACTER_SET = [" ", ...ALPHA, ...PUNCTUATION]
const CYCLE_INTERVAL = 4000

function useResponsiveFontSize() {
  const [fontSize, setFontSize] = useState("2.5rem")

  useEffect(() => {
    function update() {
      if (window.innerWidth < 480) {
        setFontSize("1.25rem")
      } else if (window.innerWidth < 768) {
        setFontSize("1.75rem")
      } else {
        setFontSize("2.5rem")
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return fontSize
}

export function Headline() {
  const [index, setIndex] = useState(0)
  const fontSize = useResponsiveFontSize()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length)
    }, CYCLE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-6 overflow-hidden">
      <SplitFlapDisplay
        characterSet={CHARACTER_SET}
        value={MESSAGES[index]}
        minLength={14}
        fontSize={fontSize}
        textColor="hsl(135, 30%, 45%)"
        background="hsl(220, 18%, 8%)"
        borderColor="hsl(220, 12%, 16%)"
        borderWidth="1px"
        step={3}
        withSound={false}
      />
    </div>
  )
}
