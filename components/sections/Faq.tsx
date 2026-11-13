import { Plus } from "lucide-react";
import { business, faqs } from "@/lib/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallButton, TextButton } from "@/components/ui/buttons";

// Answers come from lib/business.ts, the same strings the FAQPage JSON-LD uses.
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y border-t border-rule">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading
            index="08"
            label="FAQ"
            id="faq-title"
            title="Straight answers"
            sub={`Something else? Call or text ${business.phoneDisplay}.`}
          />
          <div className="mt-6 flex flex-col items-start gap-3">
            <CallButton />
            <TextButton />
          </div>
        </div>
        <div className="rounded-[10px] border border-rule bg-ticket">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-dashed border-rule last:border-b-0">
              <summary className="flex min-h-[60px] list-none items-center justify-between gap-4 px-5 py-3 text-lg font-semibold sm:px-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold">{faq.q}</h3>
                <span className="grid size-7 shrink-0 place-items-center rounded-[4px] border-[1.5px] border-muted text-muted group-open:border-lime group-open:bg-lime group-open:text-ink">
                  <Plus
                    className="size-4 transition-transform duration-150 group-open:rotate-45"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
              </summary>
              <p className="max-w-[44rem] px-5 pb-5 text-muted sm:px-6">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
