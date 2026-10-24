import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { ENGAGEMENT } from "data/engagementConfig";
import { WEDDING } from "data/weddingConfig";

// Link-preview card (WhatsApp, Telegram, etc.) personalised with ?to=<guest>
export const config = { runtime: "edge" };

// Same fields as the page: melati over soga
const MELATI = "#f4f2eb";
const SOGA = "#4a2d1b";
const INK = "#26180f";

/** Google Fonts serves TTF to clients without a browser user-agent */
async function loadFont(family: string, spec: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:${spec}`)
    ).text();
    const url = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    )?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function handler(req: NextRequest) {
  const params = new URL(req.url).searchParams;
  const guest = (params.get("to") ?? "").slice(0, 60);
  // ?for=engagement shows the engagement's date instead of the wedding's
  const event = params.get("for") === "engagement" ? ENGAGEMENT : WEDDING;
  const [display, text] = await Promise.all([
    loadFont("Yeseva+One", "wght@400"),
    loadFont("Archivo", "wght@500"),
  ]);
  const fonts = [
    display && { name: "Yeseva", data: display, weight: 400 as const },
    text && { name: "Archivo", data: text, weight: 500 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500 }[];

  const date = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(event.events[0].start));

  const name = { fontFamily: "Yeseva", fontSize: 150, lineHeight: 1 };
  const small = { fontFamily: "Archivo", fontSize: 30 };

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          background: MELATI,
          color: INK,
          padding: "0 64px 8px",
        }}
      >
        <div style={{ ...name, display: "flex" }}>{WEDDING.groom.short}</div>
        <div style={{ ...small, display: "flex", paddingBottom: 28 }}>
          Undangan pernikahan
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: SOGA,
          color: MELATI,
          padding: "0 64px",
        }}
      >
        <div style={{ ...name, display: "flex" }}>{WEDDING.bride.short}</div>
        <div
          style={{
            ...small,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>{date}</div>
          {guest && (
            <div style={{ display: "flex", marginTop: 12 }}>
              Kepada Yth. {guest}
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    }
  );
}
