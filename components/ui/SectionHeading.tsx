import type { ReactNode } from "react";

// Section header: ticket-style index and label, then a wide-caps h2.
export function SectionHeading({
  index,
  label,
  title,
  sub,
  id,
  onPaper = false,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  id?: string;
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={`label-caps flex items-center gap-3 ${onPaper ? "text-ink/70" : "text-muted"}`}>
        <span className={onPaper ? "text-ink" : "text-lime"}>{index}</span>
        <span aria-hidden="true" className={`h-px w-8 ${onPaper ? "bg-ink/30" : "bg-rule"}`} />
        {label}
      </p>
      <h2 id={id} className="display mt-4 text-[clamp(1.75rem,6.6vw,3.25rem)]">
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 max-w-[38rem] text-lg leading-normal ${onPaper ? "text-ink/75" : "text-muted"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
