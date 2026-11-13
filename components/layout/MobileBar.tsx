"use client";

import { ArrowUp, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import { usePunchList } from "@/components/PunchList/PunchListProvider";

// Mobile only: sticky [Call] [Text] [Quote] bar, shown once the hero buttons
// have scrolled away. Also hosts the Back to top button for every screen size.
export function MobileBar() {
  const { open } = usePunchList();
  const [showBar, setShowBar] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setShowBar(y > 420);
      setShowTop(y > window.innerHeight * 1.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {showTop ? (
        <button
          type="button"
          onClick={() => {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
          aria-label="Back to top"
          className="quick-fade fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-30 grid size-11 place-items-center rounded-[10px] border border-rule bg-ticket text-paper hover:border-paper md:bottom-6 md:right-6"
        >
          <ArrowUp className="size-5" strokeWidth={2} aria-hidden="true" />
        </button>
      ) : null}

      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ink pb-[env(safe-area-inset-bottom)] md:hidden ${
          showBar ? "" : "hidden"
        }`}
      >
        <div className="grid grid-cols-3 gap-2 p-2">
          <a
            href={business.phoneHref}
            className="label-caps flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-rule text-paper"
          >
            <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
            Call
          </a>
          <a
            href={business.smsHref}
            className="label-caps flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-rule text-paper"
          >
            <MessageSquare className="size-4" strokeWidth={2} aria-hidden="true" />
            Text
          </a>
          <button
            type="button"
            onClick={() => open()}
            className="label-caps min-h-12 rounded-[10px] bg-lime text-ink"
          >
            Quote
          </button>
        </div>
      </div>
    </>
  );
}
