// Converts the owner's job photos in assets/raw into WebP variants in public/images.
// Run: npm run images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const RAW = "assets/raw";
const OUT = "public/images";

const NAMES = {
  "01": "01-gazebo-finished-wide-BEST",
  "02": "02-custom-bookshelf-full-of-books-wide",
  "03": "03-porch-steps-cream-finish-wide",
  "04": "04-gazebo-01-FROM-bare-paver-patio",
  "05": "05-gazebo-02-kit-laid-out-on-tarp",
  "06": "06-gazebo-03-frame-going-up",
  "07": "07-gazebo-04-crew-fastening-roof-ON-THE-JOB",
  "08": "08-gazebo-05-TO-finished-gazebo",
  "09": "09-basement-01-FROM-dark-panelling",
  "10": "10-basement-02-mid-job-bar-corner",
  "11": "11-basement-03-TO-light-walls-theater",
  "12": "12-basement-04-TO-dining-and-lounge",
  "13": "13-basement-05-TO-stairs-and-seating",
  "14": "14-bookshelf-01-first-frame-on-shop-floor",
  "15": "15-bookshelf-02-carcass-built",
  "16": "16-bookshelf-03-raw-beside-painted",
  "17": "17-bookshelf-04-painted-gray",
  "18": "18-bookshelf-05-installed-with-books",
  "19": "19-deck-steps-01-new-build-raw-lumber",
  "20": "20-deck-steps-02-new-build-front",
  "21": "21-deck-steps-03-TO-stained",
  "22": "22-deck-steps-04-TO-stained-front",
  "23": "23-garden-bed-01-FROM-winter-bare",
  "24": "24-garden-bed-02-TO-fresh-mulch",
  "25": "25-garden-bed-03-FROM-weeds-and-debris",
  "26": "26-garden-bed-04-TO-house-front-mulched",
  "27": "27-mulched-bed-along-entry-wall",
  "28": "28-flower-bed-along-driveway-tall",
  "29": "29-house-front-island-bed-stone-border",
  "30": "30-lawn-and-beds-house-front-small",
  "31": "31-mailbox-01-FROM-knocked-off",
  "32": "32-mailbox-02-FROM-old-post",
  "33": "33-mailbox-03-TO-new-post-and-box",
  "34": "34-mailbox-04-TO-street-view",
  "35": "35-window-well-01-FROM-rusted",
  "36": "36-window-well-02-TO-new-galvanized",
  "37": "37-closet-01-FROM-wire-shelf",
  "38": "38-closet-02-TO-wood-shelves-and-rod",
  "39": "39-brick-rowhome-porch-white-columns",
  "40": "40-porch-deck-floor-dark-railing",
  "41": "41-brick-porch-floor-cleaned",
  "42": "42-porch-steps-new-treads-white-rail",
  "43": "43-side-entry-steps-stained-brown",
  "44": "44-stone-edging-along-bed",
  "45": "45-blue-front-door-fresh-trim-tall",
  "46": "46-porch-floor-FROM-captioned-small",
  "47": "47-porch-floor-TO-captioned-small",
  "48": "48-siding-FROM-captioned-small",
  "49": "49-siding-TO-captioned-small",
};

// Privacy crops: keep parked cars and plates out of frame. Values are source pixels.
const CROPS = {
  "32": { left: 262, top: 0, width: 540, height: 1080 },
  "34": { left: 0, top: 0, width: 900, height: 1080 },
  "40": { left: 0, top: 250, width: 1080, height: 830 },
};

// Stand-in photos that are not the owner's. Kept apart so they are easy to
// find and replace. See assets/stock/CREDITS.md for source and licence.
const STOCK = {
  "stock-snow": {
    src: "assets/stock/snow-shoveling-sidewalk-fema-40421.jpg",
    file: "stock-snow-shoveling-sidewalk",
  },
};

const LADDER = [400, 560, 720, 900, 1400];

async function ensureNamed(id) {
  const named = path.join(RAW, `${NAMES[id]}.jpg`);
  const short = path.join(RAW, `${id}.jpg`);
  try { await fs.access(named); } catch { await fs.rename(short, named); }
  return named;
}

async function buildPhotos() {
  const sizes = {};
  for (const id of Object.keys(NAMES).sort()) {
    const src = await ensureNamed(id);
    let img = sharp(src).rotate();
    if (CROPS[id]) img = img.extract(CROPS[id]);
    const buf = await img.toBuffer();
    const meta = await sharp(buf).metadata();
    const widths = LADDER.filter((w) => w < meta.width);
    for (const w of widths) {
      await sharp(buf).resize({ width: w }).webp({ quality: 72, effort: 6 })
        .toFile(path.join(OUT, `${NAMES[id]}-${w}w.webp`));
    }
    await sharp(buf).webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${NAMES[id]}.webp`));
    sizes[id] = { file: NAMES[id], width: meta.width, height: meta.height, widths };
  }
  for (const [id, stock] of Object.entries(STOCK)) {
    const buf = await sharp(stock.src).rotate().toBuffer();
    const meta = await sharp(buf).metadata();
    const widths = LADDER.filter((w) => w < meta.width);
    for (const w of widths) {
      await sharp(buf).resize({ width: w }).webp({ quality: 72, effort: 6 })
        .toFile(path.join(OUT, `${stock.file}-${w}w.webp`));
    }
    await sharp(buf).webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${stock.file}.webp`));
    sizes[id] = { file: stock.file, width: meta.width, height: meta.height, widths };
  }
  await fs.writeFile("lib/photo-sizes.json", JSON.stringify(sizes, null, 2) + "\n");
  console.log(`photos: ${Object.keys(sizes).length}`);
}

// The logo on the old host sits on white. Clear only the white that touches the
// border (flood fill), so the white lettering inside the black outlines stays.
async function buildLogo() {
  const src = path.join(RAW, "logo-white.png");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const lum = (i) => (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
  const bg = new Uint8Array(W * H);
  const seen = new Uint8Array(W * H);
  // Background = light regions that touch the border, plus the two large
  // enclosed gaps between the arms and the body. Lettering fills are far
  // smaller than 2000px, so they stay white.
  for (let s = 0; s < W * H; s++) {
    if (seen[s] || lum(s * 4) < 215) continue;
    const region = [];
    const stack = [s];
    seen[s] = 1;
    let border = false;
    while (stack.length) {
      const p = stack.pop();
      region.push(p);
      const x = p % W, y = (p - x) / W;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) border = true;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
        const q = yy * W + xx;
        if (seen[q] || lum(q * 4) < 215) continue;
        seen[q] = 1;
        stack.push(q);
      }
    }
    if (border || region.length > 2000) for (const p of region) bg[p] = 1;
  }
  // Edge pixels are a blend of the black outline over white. Turn that blend
  // into black with matching alpha so there is no pale halo on dark backgrounds.
  const near = (x, y, r) => {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) return true;
      if (bg[yy * W + xx]) return true;
    }
    return false;
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = y * W + x, i = p * 4;
    if (bg[p]) { data[i + 3] = 0; continue; }
    if (near(x, y, 2)) {
      const l = lum(i);
      if (l > 40) {
        const a = Math.max(0, Math.min(255, Math.round(255 - l)));
        data[i] = data[i + 1] = data[i + 2] = 0;
        data[i + 3] = a;
      }
    }
  }
  const png = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();
  const meta = await sharp(png).metadata();
  const name = "00-logo-logo-mascot-transparent";
  await fs.writeFile(path.join(OUT, `${name}.png`), png);
  await sharp(png).webp({ quality: 86, alphaQuality: 100, effort: 6 }).toFile(path.join(OUT, `${name}.webp`));
  // Nav size: shown 56px tall, so 168px covers 3x screens.
  await sharp(png).resize({ height: 168 }).webp({ quality: 84, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${name}-168h.webp`));
  console.log(`logo: ${meta.width}x${meta.height}`);
  return { width: meta.width, height: meta.height };
}

await fs.mkdir(OUT, { recursive: true });
await buildPhotos();
const logo = await buildLogo();
await fs.writeFile("lib/logo-size.json", JSON.stringify(logo) + "\n");
