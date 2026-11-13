// Our Work. Every real photo, captioned only with what the photo shows.
// Never add a town, a price, a duration or a customer name.
import type { PhotoId } from "./photos";

export type GalleryCategory = "outdoor" | "interiors" | "yard" | "fixes";

export const GALLERY_FILTERS: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outdoor", label: "Outdoor builds" },
  { id: "interiors", label: "Interiors" },
  { id: "yard", label: "Yard" },
  { id: "fixes", label: "Small fixes" },
];

export type GalleryItem = { photo: PhotoId; category: GalleryCategory; caption: string };

// Shown wide at the top of the grid.
export const GALLERY_FEATURE: GalleryItem = {
  photo: "02",
  category: "interiors",
  caption: "Custom gray cubby bookshelf filling a wall, loaded with books.",
};

// Curated order: finished work first, then the rest of each job.
export const GALLERY: GalleryItem[] = [
  { photo: "08", category: "outdoor", caption: "Gazebo up, table and chairs under it." },
  { photo: "12", category: "interiors", caption: "Basement after: dining table, bar stools at a new counter, recessed lights." },
  { photo: "39", category: "outdoor", caption: "Brick row home with white porch columns, railing and a flag." },
  { photo: "24", category: "yard", caption: "Garden bed after cleanup: crisp edge and dark fresh mulch." },
  { photo: "21", category: "outdoor", caption: "Deck steps stained red-brown." },
  { photo: "18", category: "interiors", caption: "Bookshelf installed and filled with books." },
  { photo: "33", category: "fixes", caption: "New black post with a new black mailbox, set and straight." },
  { photo: "03", category: "outdoor", caption: "Rebuilt porch steps and landing in a cream finish." },
  { photo: "26", category: "yard", caption: "Front of a stucco home after cleanup: mulched beds, trimmed shrubs." },
  { photo: "11", category: "interiors", caption: "Basement after: light gray walls, white trim and post." },
  { photo: "43", category: "outdoor", caption: "Side entry steps and landing stained brown, azaleas in bloom." },
  { photo: "36", category: "fixes", caption: "New galvanized window well set tight to the brick." },
  { photo: "01", category: "outdoor", caption: "Finished gazebo over a paver patio with a glass table and chairs." },
  { photo: "29", category: "yard", caption: "Island bed with burgundy shrubs and a stacked stone border." },
  { photo: "38", category: "interiors", caption: "Closet after: solid wood shelves on brackets with a hanging rod." },
  { photo: "42", category: "outdoor", caption: "Front steps with new wood treads between white railings." },
  { photo: "41", category: "fixes", caption: "Red brick porch floor and step, clean with crisp joints." },
  { photo: "27", category: "yard", caption: "Fresh dark mulch sweeping along a curved white entry wall." },
  { photo: "13", category: "interiors", caption: "Basement after: white stair rail, light walls." },
  { photo: "22", category: "outdoor", caption: "Stained deck steps from the front." },
  { photo: "45", category: "fixes", caption: "Blue front door with a storm door, white trim and a lantern." },
  { photo: "28", category: "yard", caption: "Summer flower bed in full colour along a split-rail fence." },
  { photo: "19", category: "outdoor", caption: "New deck landing, steps and railing in fresh pressure-treated lumber." },
  { photo: "17", category: "interiors", caption: "Both bookshelf units painted gray, standing in the shop." },
  { photo: "34", category: "fixes", caption: "The finished mailbox from the sidewalk, red flag up." },
  { photo: "44", category: "yard", caption: "Tumbled stone edging laid along a lawn bed." },
  { photo: "40", category: "outdoor", caption: "Porch deck boards and dark railing in the sun." },
  { photo: "07", category: "outdoor", caption: "Fastening the gazebo roof from a work platform." },
  { photo: "30", category: "yard", caption: "Mowed lawn with stripes and mulched beds." },
  { photo: "20", category: "outdoor", caption: "New deck steps from the front, at a side door." },
  { photo: "16", category: "interiors", caption: "One raw pine bookshelf unit next to a finished gray one." },
  { photo: "06", category: "outdoor", caption: "Gazebo posts and first beams standing on the patio." },
  { photo: "10", category: "interiors", caption: "Basement mid job: panelled bar corner, drop cloths, tool boxes." },
  { photo: "47", category: "outdoor", caption: "New porch floor boards. His caption." },
  { photo: "46", category: "outdoor", caption: "Worn gray porch floor. His caption." },
  { photo: "49", category: "fixes", caption: "The same siding, clean. His caption." },
  { photo: "48", category: "fixes", caption: "Mildewed gray siding. His caption." },
  { photo: "15", category: "interiors", caption: "Full cubby carcass built in raw pine." },
  { photo: "05", category: "outdoor", caption: "Gazebo lumber sorted on a tarp on the lawn." },
  { photo: "14", category: "interiors", caption: "First pine frame of the bookshelf on the garage floor." },
  { photo: "04", category: "outdoor", caption: "The patio before: empty paver patio, no cover." },
  { photo: "09", category: "interiors", caption: "Basement before: dark wood panelling, dark post and beam." },
  { photo: "23", category: "yard", caption: "Front bed before: bare ground, leaf litter and patches of snow." },
  { photo: "25", category: "yard", caption: "A neglected bed: weeds, debris, old pots." },
  { photo: "31", category: "fixes", caption: "A white mailbox on the grass, snapped off its post." },
  { photo: "32", category: "fixes", caption: "The weathered old mailbox post." },
  { photo: "35", category: "fixes", caption: "Old window well: bent, rusted, pulling away from the brick." },
  { photo: "37", category: "interiors", caption: "Closet before: a single sagging wire shelf." },
];
