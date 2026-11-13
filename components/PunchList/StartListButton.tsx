"use client";

import { ArrowRight } from "lucide-react";
import type { GroupId } from "@/lib/services";
import { usePunchList } from "./PunchListProvider";

// Makes a whole services tile clickable. Opens the Punch List with that
// group's jobs in view and none ticked.
export function StartListButton({ group, title }: { group: GroupId; title: string }) {
  const { open } = usePunchList();
  return (
    <button
      type="button"
      onClick={() => open({ group })}
      className="label-caps mt-auto flex min-h-11 items-center gap-2 self-start pt-5 text-paper after:absolute after:inset-0 after:rounded-[10px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-4px] focus-visible:after:outline-lime"
    >
      Start a list<span className="sr-only"> with {title}</span>
      <ArrowRight
        className="size-4 transition-transform duration-150 group-hover/tile:translate-x-1"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  );
}
