import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Zach Varney — AI Builder & Founder of Ranger Ventures"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          backgroundColor: "hsl(220, 20%, 6%)",
          padding: "80px",
        }}
      >
        {/* Green accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "hsl(135, 30%, 45%)",
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "hsl(60, 5%, 90%)",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Zach Varney
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "hsl(135, 30%, 45%)",
            marginBottom: 40,
          }}
        >
          AI Builder & Founder
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "hsl(220, 8%, 56%)",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          I build AI-powered tools and ship production code. Contracting,
          consulting, and hands-on development.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "hsl(220, 8%, 40%)",
              fontFamily: "monospace",
            }}
          >
            RANGER VENTURES LLC
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: "hsl(220, 8%, 30%)",
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "hsl(220, 8%, 40%)",
              fontFamily: "monospace",
            }}
          >
            zvarney.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
