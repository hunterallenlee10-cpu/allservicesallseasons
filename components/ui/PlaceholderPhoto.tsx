import type { LucideIcon } from "lucide-react";

// For services with no real photo yet. Never a stock or generated image:
// a labelled slot waiting for one of the owner's own photos.
export function PlaceholderPhoto({
  label,
  icon: Icon,
  className = "",
}: {
  label: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid place-items-center rounded-[10px] border border-dashed border-muted/60 bg-ticket p-6 text-center ${className}`}
    >
      <div>
        <Icon className="mx-auto size-10 text-muted" strokeWidth={1.5} aria-hidden="true" />
        <p className="label-caps mx-auto mt-5 max-w-[16rem] text-muted">{label}</p>
        <p className="mt-2 text-[0.9375rem] text-muted">Real photo to come.</p>
      </div>
    </div>
  );
}
