// His 15 services, exactly as he lists them in his Facebook post
// "What all services include?", plus our grouping for the site.
import type { PhotoId } from "./photos";

export type ServiceId =
  | "contract-maintenance"
  | "seasonal-clean-ups"
  | "renovations"
  | "handyman-services"
  | "floor-installation"
  | "roofing"
  | "plumbing"
  | "electrical-repairs"
  | "mulching"
  | "mowing"
  | "weeding"
  | "pruning-foliage"
  | "snow-removal"
  | "leaf-and-debris-removal"
  | "power-washing";

export type GroupId =
  | "renovations"
  | "handyman-repairs"
  | "yard-and-grounds"
  | "seasonal-maintenance";

export const SERVICE_NAMES: Record<ServiceId, string> = {
  "contract-maintenance": "Contract maintenance",
  "seasonal-clean-ups": "Seasonal clean ups",
  renovations: "Renovations",
  "handyman-services": "Handyman services",
  "floor-installation": "Floor installation",
  roofing: "Roofing",
  plumbing: "Plumbing",
  "electrical-repairs": "Electrical repairs",
  mulching: "Mulching",
  mowing: "Mowing",
  weeding: "Weeding",
  "pruning-foliage": "Pruning foliage",
  "snow-removal": "Snow removal",
  "leaf-and-debris-removal": "Leaf and debris removal",
  "power-washing": "Power washing",
};

// In the order of his own post.
export const ALL_SERVICES: ServiceId[] = [
  "contract-maintenance",
  "seasonal-clean-ups",
  "renovations",
  "handyman-services",
  "floor-installation",
  "roofing",
  "plumbing",
  "electrical-repairs",
  "mulching",
  "mowing",
  "weeding",
  "pruning-foliage",
  "snow-removal",
  "leaf-and-debris-removal",
  "power-washing",
];

// From his own winter post.
export const SNOW_DETAIL = ["Shoveling sidewalks and driveways", "Snow blowers", "Ice melt"];

export type Group = {
  id: GroupId;
  title: string;
  line: string;
  services: ServiceId[];
  photo: PhotoId;
  secondaryPhoto?: PhotoId;
  // Used in the Service JSON-LD. Plain description, no claims.
  description: string;
};

export const GROUPS: Group[] = [
  {
    id: "renovations",
    title: "Renovations",
    line: "Basements, decks, steps, built-ins. Start to finish.",
    services: ["renovations", "floor-installation", "roofing"],
    photo: "12",
    secondaryPhoto: "03",
    description:
      "Renovations, floor installation and roofing for homes and businesses around Lancaster, PA.",
  },
  {
    id: "handyman-repairs",
    title: "Handyman and repairs",
    line: "The list on your fridge. All of it.",
    services: ["handyman-services", "plumbing", "electrical-repairs"],
    photo: "45",
    description:
      "Handyman services, plumbing and electrical repairs for homes and businesses around Lancaster, PA.",
  },
  {
    id: "yard-and-grounds",
    title: "Yard and grounds",
    line: "Beds edged, mulch down, lawn kept.",
    services: ["mulching", "mowing", "weeding", "pruning-foliage"],
    photo: "26",
    secondaryPhoto: "30",
    description:
      "Mulching, mowing, weeding and pruning foliage for homes and businesses around Lancaster, PA.",
  },
  {
    id: "seasonal-maintenance",
    title: "Seasonal maintenance",
    line: "One crew for the whole year.",
    services: [
      "contract-maintenance",
      "seasonal-clean-ups",
      "leaf-and-debris-removal",
      "snow-removal",
      "power-washing",
    ],
    photo: "41",
    description:
      "Contract maintenance, seasonal clean ups, leaf and debris removal, snow removal and power washing around Lancaster, PA.",
  },
];

// Example small jobs neighbors mention him for on Nextdoor. Punch List chips only.
// DRAFT: confirm
export const EXTRA_JOBS = [
  "Minor carpentry",
  "Window cord repairs",
  "Screen repairs",
  "Door installs",
  "Painting",
];

export type SeasonId = "spring" | "summer" | "fall" | "winter";

export const SEASON_ORDER: SeasonId[] = ["spring", "summer", "fall", "winter"];

// Nov to Mar winter, Apr to May spring, Jun to Aug summer, Sep to Oct fall.
export function seasonForMonth(month: number): SeasonId {
  if (month >= 10 || month <= 2) return "winter";
  if (month <= 4) return "spring";
  if (month <= 7) return "summer";
  return "fall";
}

export type Season = {
  id: SeasonId;
  label: string;
  jobs: ServiceId[];
  photo: PhotoId | null;
  placeholder?: string;
  // Season bar at the top of the page.
  bar: string;
  // Jobs ticked when the season bar or seasonal band opens the Punch List.
  quoteJobs: ServiceId[];
  // Seasonal band lower on the page.
  band: { heading: string; body: string };
};

// DRAFT: season grouping to confirm with the owner
// DRAFT: confirm seasonal wording with the owner
// DRAFT: confirm what the snow service covers
export const SEASONS: Record<SeasonId, Season> = {
  spring: {
    id: "spring",
    label: "Spring",
    jobs: ["seasonal-clean-ups", "mulching", "weeding", "pruning-foliage", "power-washing"],
    photo: "24",
    bar: "Spring clean ups and mulching are booking now.",
    quoteJobs: ["seasonal-clean-ups", "mulching"],
    band: {
      heading: "Spring clean up, crossed off early.",
      body: "Seasonal clean ups, mulching, weeding and pruning foliage, for homes and businesses.",
    },
  },
  summer: {
    id: "summer",
    label: "Summer",
    jobs: ["mowing", "weeding", "pruning-foliage", "contract-maintenance"],
    photo: "28",
    bar: "Mowing, weeding and pruning, handled all summer.",
    quoteJobs: ["mowing", "weeding", "pruning-foliage"],
    band: {
      heading: "The yard, handled all summer.",
      body: "Mowing, weeding and pruning foliage, for homes and businesses.",
    },
  },
  fall: {
    id: "fall",
    label: "Fall",
    jobs: ["leaf-and-debris-removal", "seasonal-clean-ups", "power-washing"],
    photo: "29",
    bar: "Leaf and debris removal is booking now.",
    quoteJobs: ["leaf-and-debris-removal"],
    band: {
      heading: "Leaves down. We pick them up.",
      body: "Leaf and debris removal and seasonal clean ups, for homes and businesses.",
    },
  },
  winter: {
    id: "winter",
    label: "Winter",
    jobs: ["snow-removal"],
    photo: null,
    placeholder: "Photo: snow removal, from All Services All Seasons",
    bar: "Snow is on the way. Get on the snow removal list before the first storm.",
    quoteJobs: ["snow-removal"],
    band: {
      heading: "Snow removal, sorted before it falls.",
      body: "Shoveling sidewalks and driveways, snow blowers and ice melt, for homes and businesses.",
    },
  },
};

export const YEAR_ROUND: ServiceId[] = [
  "handyman-services",
  "renovations",
  "floor-installation",
  "roofing",
  "plumbing",
  "electrical-repairs",
];
