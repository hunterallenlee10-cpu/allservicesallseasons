import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Re-render hourly so the season shown on first paint follows the calendar.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Seasons />
      <StartToFinishSection />
      <Services />
      <OurWork />
      <MeetEric />
      <HowItWorks />
      <SeasonalBand />
      <Reviews />
      <Faq />
      <FinalCta />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={faqSchema()} />
    </>
  );
}
