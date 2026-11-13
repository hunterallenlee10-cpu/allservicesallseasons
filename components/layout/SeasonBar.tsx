"use client";

import { ArrowRight, X } from "lucide-react";
import { SEASONS } from "@/lib/services";
import { usePunchList } from "@/components/PunchList/PunchListProvider";
import { useSeason } from "./SeasonProvider";

// Slim bar at the top of the page. One line, chosen by the current month.
// Tapping it opens the Punch List with that season's job ticked.
export function SeasonBar() {
  const season = SEASONS[useSeason()];
  const { open } = usePunchList();

  function dismiss() {
    document.documentElement.dataset.seasonBar = "off";
    try {
      sessionStorage.setItem("asas-season-bar", "off");
    } catch {
      // Storage can be blocked. The bar still hides for this page view.
    }
  }

  return (
    <div className="season-bar border-b border-rule bg-ticket">
      <div className="shell flex items-stretch gap-1 pr-1 sm:pr-3 lg:pr-5">
        <button
          type="button"
          onClick={() => open({ tick: season.quoteJobs })}
          className="group flex min-h-11 flex-1 items-center gap-3 py-2 text-left text-[0.875rem] leading-snug text-paper sm:text-[0.9375rem]"
        >
          <span className="label-caps hidden rounded-[4px] bg-lime px-1.5 py-1 text-[0.6875rem] text-ink sm:inline-block">
            {season.label}
          </span>
          <span>
            {season.bar}{" "}
            <span className="whitespace-nowrap font-semibold underline decoration-muted underline-offset-4 group-hover:decoration-paper">
              Add it to my list
              <ArrowRight className="ml-1 inline size-3.5 align-[-2px]" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss this seasonal notice"
          className="grid size-11 shrink-0 place-items-center self-center text-muted hover:text-paper"
        >
          <X className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
