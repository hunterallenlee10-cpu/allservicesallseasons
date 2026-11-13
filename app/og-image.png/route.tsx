import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { business } from "@/lib/business";

// The link preview: 1200x630, built once at build time from his own photo and logo.
export const dynamic = "force-static";

const file = (p: string) => readFile(path.join(process.cwd(), p));
const dataUri = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

export async function GET() {
  const [photo, logo, archivo, figtree] = await Promise.all([
    file("assets/raw/01-gazebo-finished-wide-BEST.jpg"),
    file("public/images/00-logo-logo-mascot-transparent.png"),
    file("assets/fonts/Archivo-Expanded-ExtraBold.ttf"),
    file("assets/fonts/Figtree-Medium.ttf"),
  ]);

  const image = new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", position: "relative", backgroundColor: "#0E100C" }}>
        <img
          src={dataUri(photo, "image/jpeg")}
          width={1200}
          height={648}
          alt=""
          style={{ position: "absolute", top: -9, left: 0, objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, backgroundColor: "rgba(14,16,12,0.72)" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo",
                fontSize: 22,
                letterSpacing: 2.5,
                color: "#F4F3EA",
                textTransform: "uppercase",
              }}
            >
              Handyman in Lancaster, PA
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 26,
                fontFamily: "Archivo",
                fontSize: 62,
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "#F4F3EA" }}>Your problem?</span>
              <span style={{ color: "#CAD945" }}>Our solution.</span>
            </div>
            <div style={{ display: "flex", marginTop: 34, fontFamily: "Figtree", fontSize: 27, color: "#F4F3EA" }}>
              {business.name} · Call or text {business.phoneDisplay}
            </div>
          </div>
          <img src={dataUri(logo, "image/png")} width={290} height={400} alt="" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "Figtree", data: figtree, weight: 500, style: "normal" },
      ],
    },
  );

  // Quantise the PNG so the preview stays light enough for every messaging app.
  const png = await sharp(Buffer.from(await image.arrayBuffer()))
    .png({ palette: true, quality: 82, effort: 8 })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=31536000",
    },
  });
}
