import { ImageResponse } from "next/og";

export const alt = "Winslow Tandler: AI tools built for specific domains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card (rendered at build/request time). Paper-and-ink to
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
          backgroundColor: "#fcfbf8",
          color: "#20242c",
          padding: "80px",
          fontFamily: "sans-serif",
          borderTop: "12px solid #20242c",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#20242c",
            fontSize: 28,
            marginBottom: 32,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Winslow Tandler
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
          AI tools built for specific domains.
        </div>
        <div
          style={{
            display: "flex",
            color: "#63676e",
            fontSize: 26,
            marginTop: 36,
          }}
        >
          trading desks · event ops · change management · nonprofit ops ·
          intake &amp; triage
        </div>
      </div>
    ),
    size
  );
}
