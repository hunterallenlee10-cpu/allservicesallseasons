import type { MetadataRoute } from "next";
import { IS_LIVE, absoluteUrl } from "@/lib/site";

// Real last-modified dates. Update these when a page's content changes.
const PAGES: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-11-13", priority: 1 },
  { path: "/contact", lastModified: "2026-11-13", priority: 0.8 },
];

// Demo mode returns nothing, so the concept never competes with the real listing.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return [];
  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
