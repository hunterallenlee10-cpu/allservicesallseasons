import { Check } from "lucide-react";
import type { ReactNode } from "react";

export const ticketClass = "rounded-[10px] border border-rule bg-ticket";

// The job ticket: flat surface, 1px border, small caps label top left.
export function Ticket({
  label,
  aside,
  children,
  className = "",
  bodyClassName = "p-5 sm:p-6",
}: {
  label?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`${ticketClass} ${className}`}>
      {(label || aside) && (
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-dashed border-rule px-5 sm:px-6">
          <span className="label-caps text-muted">{label}</span>
          {aside ? <span className="label-caps text-muted">{aside}</span> : null}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

// Visual-only tick box. Use CheckRow for a real, interactive checkbox.
export function TickBox({
  checked = true,
  className = "",
  onPaper = false,
}: {
  checked?: boolean;
  className?: string;
  onPaper?: boolean;
}) {
  const off = onPaper ? "border-ink/50" : "border-muted";
  const on = onPaper ? "border-ink bg-lime" : "border-lime bg-lime";
  return (
    <span
      aria-hidden="true"
      className={`grid size-[22px] shrink-0 place-items-center rounded-[4px] border-[1.5px] ${
        checked ? on : off
      } ${className}`}
    >
      {checked ? <Check className="size-3.5 text-ink" strokeWidth={3.5} /> : null}
    </span>
  );
}

// A real checkbox row, 44px tall, for ticking jobs.
export function CheckRow({
  checked,
  onChange,
  children,
  detail,
  onPaper = false,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: ReactNode;
  detail?: ReactNode;
  onPaper?: boolean;
  id?: string;
}) {
  const boxOff = onPaper ? "border-ink/50" : "border-muted";
  const boxOn = onPaper
    ? "peer-checked:border-ink peer-checked:bg-lime"
    : "peer-checked:border-lime peer-checked:bg-lime";
  const hover = onPaper ? "hover:bg-ink/5" : "hover:bg-paper/5";
  return (
    <label
      className={`group flex min-h-11 cursor-pointer items-start gap-3 rounded-md px-2 py-[9px] -mx-2 ${hover}`}
    >
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-[4px] border-[1.5px] ${boxOff} ${boxOn} peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
          onPaper ? "peer-focus-visible:outline-ink" : "peer-focus-visible:outline-lime"
        } [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100`}
      >
        <Check className="size-3.5 text-ink" strokeWidth={3.5} />
      </span>
      <span className="min-w-0 leading-snug">
        <span className="font-medium">{children}</span>
        {detail ? (
          <span className={`block text-[0.9375rem] ${onPaper ? "text-ink/70" : "text-muted"}`}>
            {detail}
          </span>
        ) : null}
      </span>
    </label>
  );
}
