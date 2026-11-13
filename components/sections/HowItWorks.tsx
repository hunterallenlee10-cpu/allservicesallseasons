import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickBox } from "@/components/ui/Ticket";
import { QuoteButton } from "@/components/ui/buttons";

const STEPS = [
  { title: "Send your list.", body: "Call, text or build it here in two minutes." },
  // DRAFT: confirm whether quotes are free and whether he visits first
  { title: "We look it over and quote it.", body: "Big or small, every job on the list gets looked at." },
  { title: "We show up and cross it off.", body: "One crew, from start to finish." },
];

// Three steps on one ticket, each with its own tick box.
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="below-fold section-y border-t border-rule">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading index="06" label="How it works" id="how-title" title="Three steps. Done." />
          <QuoteButton className="self-start sm:self-auto" />
        </div>
        <ol className="mt-10 grid rounded-[10px] border border-rule bg-ticket md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col border-rule p-6 max-md:border-b max-md:border-dashed max-md:last:border-b-0 sm:p-8 md:border-r md:border-dashed md:last:border-r-0"
            >
              <div className="flex items-center justify-between">
                <span className="label-caps text-muted">Step {i + 1}</span>
                <TickBox />
              </div>
              <p aria-hidden="true" className="display mt-6 text-[3.5rem] leading-none text-lime sm:text-[4.5rem]">
                {i + 1}
              </p>
              <h3 className="display mt-5 text-[1.25rem] leading-[1.1] sm:text-[1.375rem]">{step.title}</h3>
              <p className="mt-3 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
