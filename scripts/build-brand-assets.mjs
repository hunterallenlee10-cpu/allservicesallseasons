// Favicon, app icon and Apple touch icon, cut from the mascot's head and hoodie.
// Run: npm run brand-assets
import sharp from "sharp";
import fs from "node:fs/promises";

const LOGO = "public/images/00-logo-logo-mascot-transparent.png";
const INK = "#0E100C";

// Head and upper hoodie, in logo pixels (334x461).
const CROP = { left: 103, top: 62, width: 128, height: 128 };

async function icon(size, { radius = 0, pad = 0.06 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const head = await sharp(LOGO).extract(CROP).resize(inner, inner, { kernel: "lanczos3" }).png().toBuffer();
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`,
  );
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([
      { input: head, left: Math.round((size - inner) / 2), top: Math.round((size - inner) / 2) },
      ...(radius ? [{ input: mask, blend: "dest-in" }] : []),
    ])
    .png()
    .toBuffer();
}

// A minimal .ico container holding one PNG.
function ico(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

await fs.writeFile("app/icon.png", await icon(256, { radius: 48 }));
await fs.writeFile("app/apple-icon.png", await icon(180));
await fs.writeFile("app/favicon.ico", ico(await icon(48, { radius: 9, pad: 0.02 }), 48));
console.log("brand assets written");
