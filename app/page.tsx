import type { Metadata } from "next";
import { Suspense } from "react";
import { seo } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";
import { faqSchema, JsonLd, servicesSchema } from "@/lib/schema";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MeetEric } from "@/components/sections/MeetEric";
import { OurWork } from "@/components/sections/OurWork";
import { Reviews } from "@/components/sections/Reviews";
import { SeasonalBand } from "@/components/sections/SeasonalBand";
import { Seasons } from "@/components/sections/Seasons";
import { Services } from "@/components/sections/Services";
import { StartToFinishSection } from "@/components/sections/StartToFinishSection";

export const metadata: Metadata = pageMetadata({ ...seo.home, path: "/" });

// Re-render hourly so the season shown on first paint follows the calendar.
export const revalidate = 3600;

// Each section sits in its own Suspense boundary so React hydrates the page in
// small pieces instead of one long task. Nothing here actually suspends.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense>
        <Seasons />
      </Suspense>
      <Suspense>
        <StartToFinishSection />
      </Suspense>
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <OurWork />
      </Suspense>
      <Suspense>
        <MeetEric />
      </Suspense>
      <Suspense>
        <HowItWorks />
      </Suspense>
      <Suspense>
        <SeasonalBand />
      </Suspense>
      <Suspense>
        <Reviews />
      </Suspense>
      <Suspense>
        <Faq />
      </Suspense>
      <Suspense>
        <FinalCta />
      </Suspense>
      <JsonLd data={servicesSchema()} />
      <JsonLd data={faqSchema()} />
    </>
  );
}
