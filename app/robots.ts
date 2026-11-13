import type { MetadataRoute } from "next";
import { IS_LIVE, absoluteUrl } from "@/lib/site";

// Demo: crawling stays allowed so the noindex meta tag can be read, and no
// sitemap is listed. Live: the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(IS_LIVE ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
