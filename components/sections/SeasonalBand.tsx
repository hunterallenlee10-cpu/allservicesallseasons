"use client";

import { SEASONS, SERVICE_NAMES, SNOW_DETAIL } from "@/lib/services";
import { useSeason } from "@/components/layout/SeasonProvider";
import { TickBox } from "@/components/ui/Ticket";
import { QuoteButton } from "@/components/ui/buttons";

// One wide ticket that follows the same month logic as the season bar.
// DRAFT: confirm seasonal wording and what the snow service covers
export function SeasonalBand() {
  const season = SEASONS[useSeason()];
  const winter = season.id === "winter";

  return (
    <section aria-labelledby="seasonal-title" className="pb-[4.5rem] lg:pb-[7.5rem]">
      <div className="shell">
        <div className="grid overflow-hidden rounded-[10px] border border-rule bg-ticket lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="p-6 sm:p-10">
            <p className="label-caps flex items-center gap-3 text-muted">
              <span className="rounded-[4px] bg-lime px-1.5 py-1 text-[0.6875rem] text-ink">Now</span>
              {season.label} at All Services All Seasons
            </p>
            <h2 id="seasonal-title" className="display mt-5 text-[clamp(1.625rem,5.6vw,2.75rem)]">
              {season.band.heading}
            </h2>
            <p className="mt-4 max-w-[32rem] text-lg leading-normal text-muted">{season.band.body}</p>
          </div>
          <div className="flex flex-col justify-between gap-6 border-t border-dashed border-rule p-6 sm:p-10 lg:border-l lg:border-t-0">
            <div>
              <p className="label-caps text-muted">Goes on your list</p>
              <ul className="mt-4 grid gap-3">
                {season.quoteJobs.map((id) => (
                  <li key={id} className="flex items-start gap-3">
                    <TickBox className="mt-0.5" />
                    <span className="text-lg font-medium leading-snug">
                      {SERVICE_NAMES[id]}
                      {winter ? (
                        <span className="block text-base font-normal text-muted">
                          {SNOW_DETAIL.join(", ").replace(/, S/, ", s").replace(/, I/, ", i")}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <QuoteButton tick={season.quoteJobs} className="self-start" />
          </div>
        </div>
      </div>
    </section>
  );
}
