"use client";

import { useEffect, useRef } from "react";
import { usePunchList } from "./PunchListProvider";
import { PunchListForm } from "./PunchListForm";

// The Punch List embedded in the page (used on /contact). While it is mounted,
// every "Get My Quote" button scrolls here instead of opening the modal.
export function PunchListInline() {
  const { registerInline } = usePunchList();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerInline(ref.current);
    return () => registerInline(null);
  }, [registerInline]);

  return (
    <div
      ref={ref}
      id="punch-list"
      tabIndex={-1}
      className="rounded-[10px] border border-ink bg-ticket text-paper outline-none"
    >
      <PunchListForm variant="inline" />
    </div>
  );
}
