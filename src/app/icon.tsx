import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "hsl(210, 14%, 7%)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "hsl(40, 54%, 49%)",
            fontFamily: "monospace",
          }}
        >
          ZV
        </div>
      </div>
    ),
    { ...size }
  )
}
