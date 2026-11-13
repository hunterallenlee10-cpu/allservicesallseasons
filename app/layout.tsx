import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";
import { business, seo } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";
import { businessSchema, JsonLd } from "@/lib/schema";
import { seasonForMonth } from "@/lib/services";
import { IS_LIVE, SITE_URL } from "@/lib/site";
import { MobileBar } from "@/components/layout/MobileBar";
import { Nav } from "@/components/layout/Nav";
import { SeasonBar } from "@/components/layout/SeasonBar";
import { SeasonProvider } from "@/components/layout/SeasonProvider";
import { PunchListProvider } from "@/components/PunchList/PunchListProvider";
import { Footer } from "@/components/sections/Footer";

// Display: Archivo (Google Fonts, OFL) at width 125, weights 700 and 800.
// Self-hosted as a Latin subset of the expanded cut: 20KB instead of 90KB for
// the full variable file, which matters on a phone.
const archivo = localFont({
  src: [
    { path: "../assets/fonts/archivo-expanded-700.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/archivo-expanded-800.woff2", weight: "800", style: "normal" },
  ],
  declarations: [{ prop: "font-stretch", value: "125%" }],
  display: "swap",
  variable: "--font-archivo",
});

// Body: Figtree 400, 500, 600.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-figtree",
});

// Figtree italic is only used for his "From this..." captions, so it is not preloaded.
const figtreeItalic = Figtree({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
  preload: false,
  variable: "--font-figtree-italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({ ...seo.home, path: "/" }),
  applicationName: business.shortName,
  // The launch switch: demo stays out of search, live is indexable.
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0E100C",
  colorScheme: "dark",
};

// Hides the season bar before first paint if it was dismissed this session.
const seasonBarScript = `try{if(sessionStorage.getItem("asas-season-bar")==="off")document.documentElement.dataset.seasonBar="off"}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const initialSeason = seasonForMonth(new Date().getMonth());

  return (
    <html lang="en" className={`${archivo.variable} ${figtree.variable} ${figtreeItalic.variable}`} suppressHydrationWarning>
      <body className="bg-ink text-paper">
        <script dangerouslySetInnerHTML={{ __html: seasonBarScript }} />
        <a
          href="#main"
          className="label-caps sr-only z-50 rounded-md bg-lime px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <SeasonProvider initialSeason={initialSeason}>
          <PunchListProvider>
            <SeasonBar />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <MobileBar />
          </PunchListProvider>
        </SeasonProvider>
        <JsonLd data={businessSchema()} />
        {/* Vercel Analytics only loads on Vercel, where its script exists. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
