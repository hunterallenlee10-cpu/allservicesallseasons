"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePunchList } from "./PunchListProvider";
import { PunchListForm } from "./PunchListForm";

// The Punch List as a modal job ticket. Native <dialog> gives us the focus
// trap, Esc to close and an inert page behind it.
export default function PunchListModal() {
  const { close } = usePunchList();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="punch-list-title"
      onClose={close}
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="quick-fade fixed inset-0 m-0 h-dvh w-full overflow-hidden bg-transparent p-0 text-paper sm:grid sm:place-items-center sm:p-6"
    >
      <div className="relative flex h-dvh w-full flex-col overflow-hidden border-rule bg-ticket sm:h-auto sm:max-h-[min(860px,calc(100dvh-48px))] sm:max-w-[680px] sm:rounded-[10px] sm:border">
        <button
          type="button"
          onClick={close}
          aria-label="Close the Punch List"
          className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-md text-muted hover:text-paper"
        >
          <X className="size-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <PunchListForm variant="modal" />
      </div>
    </dialog>
  );
}
