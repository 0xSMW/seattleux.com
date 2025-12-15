import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/seo/site";

export const runtime = "edge";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const siteUrl = getSiteUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "600px",
          display: "flex",
          background: "#0b1220",
          color: "#ffffff",
          padding: "64px",
          justifyContent: "space-between",
          flexDirection: "column",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 20, opacity: 0.85 }}>Seattle UX</div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>
            Find Seattle UX teams
            <br />
            and best practices
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#06b6d4",
            }}
          />
          <div style={{ fontSize: 20, opacity: 0.85 }}>{siteUrl}</div>
        </div>
      </div>
    ),
    size,
  );
}

