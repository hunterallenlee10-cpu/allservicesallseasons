import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";
import { business, seo } from "@/lib/business";
import { businessSchema, JsonLd } from "@/lib/schema";
import { seasonForMonth } from "@/lib/services";
import { IS_LIVE, SITE_URL } from "@/lib/site";
import { MobileBar } from "@/components/layout/MobileBar";
import { Nav } from "@/components/layout/Nav";
import { SeasonBar } from "@/components/layout/SeasonBar";
import { SeasonProvider } from "@/components/layout/SeasonProvider";
import { PunchListProvider } from "@/components/PunchList/PunchListProvider";
import { Footer } from "@/components/sections/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.home.title,
  description: seo.home.description,
  applicationName: business.shortName,
  // The launch switch: demo stays out of search, live is indexable.
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: seo.home.title,
    description: seo.home.description,
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your problem? Our solution. All Services All Seasons, LLC, handyman in Lancaster, PA.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.home.title,
    description: seo.home.description,
    images: ["/og-image.png"],
  },
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
    <html lang="en" className={`${archivo.variable} ${figtree.variable}`} suppressHydrationWarning>
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
        <Analytics />
      </body>
    </html>
  );
}
