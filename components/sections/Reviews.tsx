import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickBox, Ticket } from "@/components/ui/Ticket";

// Sample cards only. Replace with real Google reviews before launch.
// They are placeholders for layout and are not in the structured data.
const SAMPLES = [
  "We had a list of small repairs that kept getting put off. One visit and every one was crossed off.",
  "Beds cleaned up and mulched in the spring, then back for the leaves in the fall. One number for all of it.",
  "The mailbox got knocked over on a Tuesday. New post, new box, set straight.",
];

export function Reviews() {
  const years = business.nextdoor_winner_years;
  return (
    <section aria-labelledby="reviews-title" className="below-fold section-y border-t border-rule">
      <div className="shell">
        <SectionHeading index="07" label="Word of mouth" id="reviews-title" title="What neighbors say" />

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Real proof. DRAFT: confirm the count before launch, it changes. */}
          <Ticket label="Nextdoor Neighborhood Favorite" className="flex flex-col lg:col-span-5" bodyClassName="flex flex-1 flex-col p-6 sm:p-8">
            <p className="display text-[5.5rem] leading-[0.9] text-lime sm:text-[7.5rem]">
              {business.nextdoor_neighborhoods}
            </p>
            <p className="mt-5 text-lg leading-normal">
              Nextdoor neighborhoods where {business.shortName} is a Neighborhood Favorite. Winner in{" "}
              {years.slice(0, -1).join(", ")} and {years[years.length - 1]}.
            </p>
            <a
              href={business.nextdoor}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block self-start py-2.5 font-semibold underline decoration-muted underline-offset-4 hover:decoration-paper"
            >
              See {business.shortName} on Nextdoor
              <ArrowUpRight className="ml-1 inline size-4 align-[-2px]" strokeWidth={2} aria-hidden="true" />
            </a>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Winning years">
              {years.map((year) => (
                <li
                  key={year}
                  className="label-caps flex min-h-9 items-center gap-2 rounded-md border border-rule px-2.5 text-paper"
                >
                  <TickBox className="size-4 rounded-[3px] [&>svg]:size-2.5" />
                  {year}
                </li>
              ))}
            </ul>
          </Ticket>

          <ul className="grid gap-4 lg:col-span-7">
            {SAMPLES.map((text) => (
              <li key={text} className="rounded-[10px] border border-dashed border-muted/60 p-5 sm:p-6">
                <p className="label-caps inline-block rounded-[4px] border border-muted/60 px-2 py-1.5 text-[0.6875rem] text-paper">
                  Sample review: replace with real Google reviews
                </p>
                <p className="mt-4 text-lg leading-normal text-muted">{text}</p>
                <p className="mt-3 text-[0.9375rem] text-muted">Neighbor name</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
