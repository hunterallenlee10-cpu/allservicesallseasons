import { business } from "@/lib/business";
import { CallButton, QuoteButton } from "@/components/ui/buttons";
import { TickBox } from "@/components/ui/Ticket";
import { HeroCompare } from "./HeroCompare";

const FACTS = [
  business.establishedLabel,
  `Fully insured · ${business.registration}`,
  "Nextdoor Neighborhood Favorite",
];

function Facts({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {FACTS.map((fact) => (
        <li
          key={fact}
          className="label-caps flex min-h-9 items-center gap-2 rounded-md border border-rule bg-ticket px-2.5 text-[0.6875rem] text-paper sm:text-xs"
        >
          <TickBox className="size-4 rounded-[3px] [&>svg]:size-2.5" />
          {fact}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-rule">
      <div className="shell grid gap-x-16 gap-y-7 pb-14 pt-6 sm:pt-10 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center lg:pb-24 lg:pt-20">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          {/* One h1: the eyebrow carries the service and the town, the headline is his own line. */}
          <h1 id="hero-title">
            <span className="label-caps block text-muted">
              Handyman and property maintenance in Lancaster, PA
            </span>
            <span className="display mt-3 block text-[clamp(2.125rem,9.6vw,3.5rem)] sm:mt-5 lg:text-[clamp(3.25rem,5.1vw,4.5rem)]">
              {/* "Your problem?" then "Our solution." stacked word by word, second line in lime. */}
              {business.headline[0].split(" ").map((word) => (
                <span key={word} className="block">
                  {word}{" "}
                </span>
              ))}
              {business.headline[1].split(" ").map((word) => (
                <span key={word} className="block text-lime">
                  {word}{" "}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-normal text-muted sm:mt-6 sm:text-lg">
            Repairs, renovations, yard work and snow removal
            <span className="hidden sm:inline"> for homes and businesses</span> around Lancaster.
            <span className="hidden sm:inline">
              {" "}
              Big jobs, small jobs, and the ones that pop up out of nowhere.{" "}
              <span className="text-paper">{business.tagline}</span>
            </span>
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <QuoteButton />
            <CallButton />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px] lg:mr-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="overflow-hidden rounded-[10px] border border-rule bg-ticket">
            <HeroCompare />
            <div className="flex min-h-11 items-center justify-between gap-4 px-4">
              <span className="label-caps whitespace-nowrap text-muted">
                Same patio<span className="max-[420px]:hidden lg:max-xl:hidden">, before and after</span>
              </span>
              <span className="label-caps shrink-0 text-muted">Drag the line</span>
            </div>
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          {/* On a phone the rest of the intro sits under the photo, so the first screen stays short. */}
          <p className="mb-5 text-[1.0625rem] leading-normal text-muted sm:hidden">
            For homes and businesses. Big jobs, small jobs, and the ones that pop up out of nowhere.{" "}
            <span className="text-paper">{business.tagline}</span>
          </p>
          <Facts />
        </div>
      </div>
    </section>
  );
}
