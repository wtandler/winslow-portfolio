import { ImageResponse } from "next/og";

export const alt = "Winslow Tandler — AI tools, built one domain at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card (rendered at build/request time). Terminal-dark to
// match the site; no custom fonts to keep generation fast and dependency-free.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0c0c0c",
          color: "#e0e0e0",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", color: "#4ade80", fontSize: 30, marginBottom: 28 }}>
          ~/wtandler
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            maxWidth: 920,
          }}
        >
          AI tools, built one domain at a time.
        </div>
        <div style={{ display: "flex", color: "#8a8a8a", fontSize: 26, marginTop: 36 }}>
          trading desks · event ops · change management · nonprofit ops · intake &amp; triage
        </div>
      </div>
    ),
    size
  );
}
