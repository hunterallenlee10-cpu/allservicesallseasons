import { business } from "@/lib/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StartToFinish } from "@/components/StartToFinish/StartToFinish";

export function StartToFinishSection() {
  return (
    <section
      id="start-to-finish"
      aria-labelledby="start-to-finish-title"
      className="section-y border-y border-rule"
    >
      <div className="shell">
        <div className="mx-auto max-w-[1040px]">
        <SectionHeading
          index="02"
          label="Start to finish"
          id="start-to-finish-title"
          title={
            <>
              {business.fromCaption} <span className="block text-lime sm:inline">to this.</span>
            </>
          }
          sub="Real jobs, start to finish. Drag to watch them come together."
          className="mb-10"
        />
          <StartToFinish />
        </div>
      </div>
    </section>
  );
}
