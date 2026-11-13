// The launch switch. Everything about indexing is driven from here.
// demo (default): noindex, no sitemap, concept line in the footer.
// live: index, sitemap listed, concept line hidden.
export const SITE_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

export const IS_LIVE = SITE_MODE === "live";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  // On Vercel, fall back to the project's production URL so link previews of
  // the demo still resolve to absolute image URLs.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
