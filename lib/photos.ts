// Photo registry. Sizes come from the image build (npm run images).
// Alt text is written from the photo map and says only what is visible.
import sizes from "./photo-sizes.json";
import logoSize from "./logo-size.json";

export type PhotoId = keyof typeof sizes;

const ALT: Record<PhotoId, string> = {
  "01": "Finished cedar-tone gazebo over a paver patio with a glass table and chairs, green hedge behind.",
  "02": "Finished custom gray cubby bookshelf filling a wall, loaded with books, carved ducks on top.",
  "03": "Rebuilt porch steps and landing in a cream finish beside a paver walk.",
  "04": "Empty curved paver patio against gray siding, before the gazebo was built.",
  "05": "Gazebo lumber sorted on a tarp on the lawn beside tool cases.",
  "06": "Gazebo posts and first beams standing on the patio, with ladders and a work platform.",
  "07": "A crew member in an orange shirt on a work platform fastening the gazebo roof, blue ladder in front.",
  "08": "The same patio finished, with the gazebo up and a table and chairs under it.",
  "09": "Basement before, with dark wood panelling, a dark post and beam, a sofa and a projector screen.",
  "10": "Basement mid job, with a panelled bar corner, drop cloths, tool boxes and a bucket on the floor.",
  "11": "Basement after, with light gray walls, white trim and post, the same sofa and screen.",
  "12": "Basement after, with a dining table, bar stools at a new counter, a sectional and recessed lights.",
  "13": "Basement after, with a white stair rail, light walls, a recliner and a sofa.",
  "14": "First pine frame of the bookshelf laid out on the garage floor.",
  "15": "Full cubby bookshelf carcass built in raw pine, lying on the floor.",
  "16": "One raw pine bookshelf unit standing next to a finished gray one in the shop.",
  "17": "Both bookshelf units painted gray, standing in the shop.",
  "18": "The gray bookshelf installed in the home and filled with books.",
  "19": "New deck landing, steps and railing in fresh pressure-treated lumber, side view.",
  "20": "The new deck steps from the front, at a side door.",
  "21": "The same deck steps stained red-brown, side view.",
  "22": "The stained deck steps from the front.",
  "23": "Front garden bed before, with bare ground, leaf litter and patches of snow under a Japanese maple.",
  "24": "The same bed and tree after cleanup, with a crisp edge and dark fresh mulch.",
  "25": "Close view of a neglected garden bed with weeds, debris and old pots.",
  "26": "Front of a stucco home after cleanup, with mulched beds and trimmed shrubs.",
  "27": "Fresh dark mulch sweeping along a curved white entry wall.",
  "28": "Summer flower bed in full colour along a split-rail fence and driveway.",
  "29": "Colonial home with an island bed, burgundy shrubs and a stacked stone border.",
  "30": "Mowed lawn with stripes and mulched beds in front of a green-sided home.",
  "31": "A white mailbox lying on the grass, snapped off its post.",
  "32": "A weathered old mailbox post with a black box.",
  "33": "New black post with a new black mailbox, set and straight.",
  "34": "The finished black mailbox from the sidewalk, red flag up.",
  "35": "Old basement window well, bent, rusted and pulling away from the brick.",
  "36": "New galvanized window well set tight to the brick with fresh soil graded around it.",
  "37": "Closet before, with a single sagging wire shelf.",
  "38": "Closet after, with solid wood shelves on brackets and a hanging rod.",
  "39": "Brick row home with white porch columns, a railing and a flag under a blue sky.",
  "40": "Porch deck boards and dark railing in the sun.",
  "41": "Red brick porch floor and step, clean with crisp joints.",
  "42": "Front steps with new wood treads between white railings.",
  "43": "Side entry steps and landing stained brown, with azaleas in bloom.",
  "44": "Tumbled stone edging laid along a lawn bed.",
  "45": "Blue front door with a storm door, white trim and a lantern.",
  "46": "Worn gray porch floor, with the owner's own caption: From this...",
  "47": "New porch floor boards, with the owner's own caption: To this.",
  "48": "Mildewed gray siding with a ladder, with the owner's own caption: From this...",
  "49": "The same siding clean, with the owner's own caption: To this.",
  // Stock stand-in, not the owner's photo. See assets/stock/CREDITS.md.
  "stock-snow": "A person in a teal parka shovels snow off a sidewalk with an orange shovel. Stock photo.",
};

export type Photo = {
  id: PhotoId;
  file: string;
  width: number;
  height: number;
  widths: number[];
  alt: string;
};

export function getPhoto(id: PhotoId): Photo {
  return { id, ...sizes[id], alt: ALT[id] };
}

export function photoSrc(id: PhotoId, width?: number): string {
  const p = sizes[id];
  if (width && p.widths.includes(width)) return `/images/${p.file}-${width}w.webp`;
  return `/images/${p.file}.webp`;
}

export function photoSrcSet(id: PhotoId): string {
  const p = sizes[id];
  return [
    ...p.widths.map((w) => `/images/${p.file}-${w}w.webp ${w}w`),
    `/images/${p.file}.webp ${p.width}w`,
  ].join(", ");
}

export const LOGO = {
  png: "/images/00-logo-logo-mascot-transparent.png",
  webp: "/images/00-logo-logo-mascot-transparent.webp",
  small: "/images/00-logo-logo-mascot-transparent-168h.webp",
  width: logoSize.width,
  height: logoSize.height,
  alt: "All Services All Seasons, LLC logo: a bearded man in a lime hoodie with open arms",
};
