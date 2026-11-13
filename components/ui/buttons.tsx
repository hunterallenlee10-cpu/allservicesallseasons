"use client";

import { Check, MessageSquare, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/lib/business";
import type { GroupId, ServiceId } from "@/lib/services";
import { usePunchList } from "@/components/PunchList/PunchListProvider";

const base =
  "group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[10px] px-6 label-caps whitespace-nowrap text-[0.8125rem] transition-colors duration-150 active:translate-y-px select-none";

export const btnPrimary = `${base} bg-lime text-ink hover:bg-paper`;
export const btnGhost = `${base} border border-rule text-paper hover:border-paper`;
export const btnGhostOnPaper = `${base} border border-ink/30 text-ink hover:border-ink`;
export const btnDark = `${base} bg-ink text-paper hover:bg-ticket`;

// The one primary action on the site. Opens the Punch List, optionally with
// jobs already ticked or a service group in view.
export function QuoteButton({
  tick,
  group,
  children = "Get My Quote",
  className = "",
  variant = "primary",
  compact = false,
}: {
  tick?: ServiceId[];
  group?: GroupId;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "dark";
  compact?: boolean;
}) {
  const { open } = usePunchList();
  const dark = variant === "dark";
  return (
    <button
      type="button"
      onClick={() => open({ tick, group })}
      className={`${dark ? btnDark : btnPrimary} ${compact ? "min-h-11 px-4" : ""} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-[18px] shrink-0 place-items-center rounded-[3px] border-2 ${
          dark ? "border-paper" : "border-ink"
        }`}
      >
        <Check
          className="size-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          strokeWidth={4}
        />
      </span>
      {children}
    </button>
  );
}

export function CallButton({
  className = "",
  onPaper = false,
  label,
}: {
  className?: string;
  onPaper?: boolean;
  label?: string;
}) {
  return (
    <a href={business.phoneHref} className={`${onPaper ? btnGhostOnPaper : btnGhost} ${className}`}>
      <Phone className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      {label ?? `Call ${business.phoneDisplay}`}
    </a>
  );
}

export function TextButton({ className = "", onPaper = false }: { className?: string; onPaper?: boolean }) {
  return (
    <a href={business.smsHref} className={`${onPaper ? btnGhostOnPaper : btnGhost} ${className}`}>
      <MessageSquare className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      Text {business.phoneDisplay}
    </a>
  );
}
