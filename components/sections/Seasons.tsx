"use client";

import { Flower2, Leaf, Snowflake, Sun, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  SEASONS,
  SEASON_ORDER,
  SERVICE_NAMES,
  SNOW_DETAIL,
  YEAR_ROUND,
  type SeasonId,
} from "@/lib/services";
import { usePunchList } from "@/components/PunchList/PunchListProvider";
import { useSeason } from "@/components/layout/SeasonProvider";
import { Photo } from "@/components/ui/Photo";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckRow, Ticket } from "@/components/ui/Ticket";
import { QuoteButton } from "@/components/ui/buttons";

const ICONS: Record<SeasonId, LucideIcon> = {
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
  winter: Snowflake,
};

// The differentiator: one call covers every season.
// A Season Switch with four tabs. The tab for today's season opens first and
// carries a NOW tag. Rows tick straight onto the visitor's Punch List.
export function Seasons() {
  const now = useSeason();
  const [active, setActive] = useState<SeasonId>(now);
  const touched = useRef(false);
  const tabs = useRef<Partial<Record<SeasonId, HTMLButtonElement | null>>>({});
  const { form, toggleService, count } = usePunchList();

  // If the visitor's own calendar disagrees with the server, follow the visitor.
  useEffect(() => {
    if (!touched.current) setActive(now);
  }, [now]);

  function select(id: SeasonId, focus = false) {
    touched.current = true;
    setActive(id);
    if (focus) tabs.current[id]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = SEASON_ORDER.indexOf(active);
    const last = SEASON_ORDER.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    select(SEASON_ORDER[next], true);
  }

  const season = SEASONS[active];
  const allTicked = season.jobs.every((id) => form.services.includes(id));

  return (
    <section id="seasons" aria-labelledby="seasons-title" className="below-fold section-y">
      <div className="shell">
        <SectionHeading
          index="01"
          label="Every season"
          id="seasons-title"
          title={
            <>
              All services. <span className="block sm:inline">All seasons.</span>
            </>
          }
          sub="One call covers every season and every size of job. Tick what you need as you go."
        />

        <div
          role="tablist"
          aria-label="Seasons"
          onKeyDown={onKeyDown}
          className="mt-10 grid grid-cols-4 gap-1.5 rounded-[10px] border border-rule bg-ticket p-1.5 sm:inline-grid sm:gap-2"
        >
          {SEASON_ORDER.map((id) => {
            const selected = id === active;
            const Icon = ICONS[id];
            return (
              <button
                key={id}
                ref={(el) => {
                  tabs.current[id] = el;
                }}
                type="button"
                role="tab"
                id={`season-tab-${id}`}
                aria-selected={selected}
                aria-controls="season-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id)}
                className={`label-caps relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-1 text-[0.6875rem] transition-colors sm:min-w-[132px] sm:flex-row sm:gap-2 sm:px-5 sm:text-xs ${
                  selected ? "bg-lime text-ink" : "text-muted hover:text-paper"
                }`}
              >
                <Icon className="size-4 max-sm:hidden" strokeWidth={2} aria-hidden="true" />
                {SEASONS[id].label}
                {id === now ? (
                  <span
                    className={`rounded-[3px] px-1 py-0.5 text-[0.625rem] leading-none tracking-[0.06em] ${
                      selected ? "bg-ink text-lime" : "bg-lime text-ink"
                    }`}
                  >
                    Now
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="season-panel"
          aria-labelledby={`season-tab-${active}`}
          tabIndex={0}
          className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8"
        >
          <div key={`photo-${active}`} className="quick-fade">
            {season.photo ? (
              <div className="relative grid aspect-[5/4] place-items-center overflow-hidden rounded-[10px] border border-rule bg-ticket lg:aspect-auto lg:h-full lg:min-h-[400px]">
                <Photo
                  id={season.photo}
                  sizes="(min-width: 1024px) 520px, calc(100vw - 34px)"
                  className={
                    active === "summer"
                      ? "h-full max-h-[420px] w-auto object-contain lg:max-h-[440px]"
                      : "size-full object-cover lg:absolute lg:inset-0"
                  }
                />
                {/* Honest label: this one is a stand-in, not one of his job photos. */}
                {season.stockPhoto ? (
                  <span className="label-caps absolute bottom-2.5 left-2.5 rounded-[4px] border border-rule bg-ink px-2 py-1.5 text-[0.6875rem] text-paper">
                    Stock photo
                  </span>
                ) : null}
              </div>
            ) : (
              <PlaceholderPhoto
                label={season.placeholder ?? ""}
                icon={ICONS[active]}
                className="aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[400px]"
              />
            )}
          </div>

          {/* DRAFT: season grouping to confirm with the owner */}
          <Ticket
            key={`ticket-${active}`}
            label={season.label}
            aside={`${season.jobs.length} ${season.jobs.length === 1 ? "job" : "jobs"}`}
            className="quick-fade flex flex-col"
            bodyClassName="flex flex-1 flex-col p-5 sm:p-6"
          >
            <div className="grid gap-0.5">
              {season.jobs.map((id) => (
                <CheckRow
                  key={id}
                  checked={form.services.includes(id)}
                  onChange={(next) => toggleService(id, next)}
                >
                  <span className="text-lg">{SERVICE_NAMES[id]}</span>
                </CheckRow>
              ))}
            </div>
            {active === "winter" ? (
              <ul className="mt-2 grid gap-2 border-t border-dashed border-rule pt-4 text-muted">
                {SNOW_DETAIL.map((line) => (
                  <li key={line} className="flex items-center gap-3 pl-0.5">
                    <span aria-hidden="true" className="h-px w-[18px] bg-muted" />
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
            {/* DRAFT: confirm seasonal wording with the owner */}
            <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[26rem] text-muted">{season.bar}</p>
              <button
                type="button"
                onClick={() => season.jobs.forEach((id) => toggleService(id, !allTicked))}
                className="label-caps min-h-11 shrink-0 whitespace-nowrap rounded-[10px] border border-rule px-4 text-paper hover:border-paper"
              >
                {allTicked ? "Untick" : "Tick"} {season.jobs.length === 1 ? "it" : `all ${season.jobs.length}`}
              </button>
            </div>
          </Ticket>
        </div>

        <Ticket label="Year-round" aside="Any weather" className="mt-6 lg:mt-8">
          <div className="grid gap-x-8 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
            {YEAR_ROUND.map((id) => (
              <CheckRow
                key={id}
                checked={form.services.includes(id)}
                onChange={(next) => toggleService(id, next)}
              >
                <span className="text-lg">{SERVICE_NAMES[id]}</span>
              </CheckRow>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-4 border-t border-dashed border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted" aria-live="polite">
              <span className="display mr-2 text-[1.5rem] text-lime">{count}</span>
              {count === 1 ? "job" : "jobs"} on your list
            </p>
            <QuoteButton />
          </div>
        </Ticket>
      </div>
    </section>
  );
}
