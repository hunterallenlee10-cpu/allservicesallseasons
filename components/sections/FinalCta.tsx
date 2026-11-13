import { business } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";
import { CallButton, QuoteButton } from "@/components/ui/buttons";

// The only full-width photo on the site: the finished gazebo, darkened.
export function FinalCta({ heading = "Got a list? Hand it over." }: { heading?: string }) {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate mx-auto max-w-[2000px] overflow-hidden border-t border-rule">
      <Photo id="01" alt="" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/55" />
      <div className="shell flex min-h-[460px] flex-col items-start justify-center py-20 lg:min-h-[560px] lg:py-28">
        <div className="rounded-[10px] border border-rule bg-ink p-6 sm:p-10">
          <h2 id="final-cta-title" className="display text-[clamp(1.875rem,7vw,3.5rem)]">
            {heading.split("? ").length === 2 ? (
              <>
                {heading.split("? ")[0]}?<span className="block text-lime">{heading.split("? ")[1]}</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="mt-4 text-lg text-paper">{business.tagline}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <QuoteButton />
            <CallButton />
          </div>
        </div>
      </div>
    </section>
  );
}
