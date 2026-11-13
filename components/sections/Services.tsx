import type { ReactNode } from "react";
import { GROUPS, SERVICE_NAMES, type Group, type GroupId } from "@/lib/services";
import { StartListButton } from "@/components/PunchList/StartListButton";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteButton } from "@/components/ui/buttons";

const byId = Object.fromEntries(GROUPS.map((g) => [g.id, g])) as Record<GroupId, Group>;

// One bento tile. The whole ticket is clickable: it opens the Punch List with
// this group's jobs in view and none ticked.
function Tile({
  group,
  index,
  className = "",
  children,
}: {
  group: Group;
  index: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className={`group/tile relative flex flex-col overflow-hidden rounded-[10px] border border-rule bg-ticket transition-colors hover:border-muted ${className}`}
    >
      <div className="flex min-h-11 items-center justify-between gap-4 border-b border-dashed border-rule px-5 sm:px-6">
        <span className="label-caps text-muted">Group {index}</span>
        <span className="label-caps text-muted">{group.services.length} services</span>
      </div>
      {children}
    </article>
  );
}

function TileText({ group, className = "" }: { group: Group; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <h3 id={`${group.id}-title`} className="display text-[1.375rem] sm:text-[1.625rem]">
        {group.title}
      </h3>
      <p className="mt-2 text-muted">{group.line}</p>
      <ul className="mt-4 grid gap-2">
        {group.services.map((id) => (
          <li key={id} className="flex items-center gap-3 text-lg font-medium leading-snug">
            <span aria-hidden="true" className="size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-muted" />
            {SERVICE_NAMES[id]}
          </li>
        ))}
      </ul>
      <StartListButton group={group.id} title={group.title} />
    </div>
  );
}

const frame = "overflow-hidden rounded-md border border-rule bg-ink";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="below-fold section-y">
      <div className="shell">
        <SectionHeading
          index="03"
          label="His list, his words"
          id="services-title"
          title="What all services include"
          sub="Complete interior and exterior work, full-service landscaping and snow removal, for your home or business."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Large tile: renovations */}
          <Tile group={byId.renovations} index="01" className="lg:col-span-7">
            <div className="flex flex-1 flex-col gap-5 p-5 sm:gap-6 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,280px)] sm:gap-6">
                <TileText group={byId.renovations} />
                <div className={`${frame} max-sm:order-first`}>
                  <Photo
                    id="12"
                    sizes="(min-width: 640px) 280px, calc(100vw - 74px)"
                    className="aspect-[4/3] w-full object-cover sm:aspect-square"
                  />
                </div>
              </div>
              <div className={`${frame} relative min-h-[150px] flex-1 sm:min-h-[230px]`}>
                <Photo
                  id="03"
                  sizes="(min-width: 1024px) 640px, calc(100vw - 74px)"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </div>
          </Tile>

          {/* Tall tile: handyman and repairs */}
          <Tile group={byId["handyman-repairs"]} index="02" className="lg:col-span-5">
            <div className="grid flex-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 p-5 sm:gap-6 sm:p-6 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
              <div className={`${frame} self-start lg:mx-auto lg:w-[58%]`}>
                <Photo id="45" sizes="(min-width: 1024px) 260px, 38vw" className="h-auto w-full" />
              </div>
              <TileText group={byId["handyman-repairs"]} />
            </div>
          </Tile>

          {/* Wide tile: yard and grounds */}
          <Tile group={byId["yard-and-grounds"]} index="03" className="lg:col-span-7">
            <div className="grid flex-1 gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,300px)] sm:gap-6 sm:p-6">
              <TileText group={byId["yard-and-grounds"]} />
              <div className="relative self-start pb-10 max-sm:order-first sm:pb-12">
                <div className={frame}>
                  <Photo
                    id="26"
                    sizes="(min-width: 640px) 300px, calc(100vw - 74px)"
                    className="aspect-[4/3] w-full object-cover sm:aspect-square"
                  />
                </div>
                {/* Small source photo: inset only, never wider than 400px. */}
                <div className="absolute bottom-0 right-3 w-[46%] max-w-[190px] overflow-hidden rounded-md border-4 border-ticket bg-ink sm:left-[-36px] sm:right-auto sm:w-[60%]">
                  <Photo id="30" sizes="190px" className="aspect-[800/543] w-full object-cover" />
                </div>
              </div>
            </div>
          </Tile>

          {/* Medium tile: seasonal maintenance */}
          <Tile group={byId["seasonal-maintenance"]} index="04" className="lg:col-span-5">
            <div className="grid flex-1 gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] sm:gap-6 sm:p-6">
              <div className={`${frame} relative min-h-[120px] sm:min-h-[220px]`}>
                <Photo
                  id="41"
                  sizes="(min-width: 640px) 130px, calc(100vw - 74px)"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <TileText group={byId["seasonal-maintenance"]} />
            </div>
          </Tile>
        </div>

        {/* His own captioned pairs, shown exactly as he made them. */}
        <div className="mt-10 lg:mt-14">
          <p className="label-caps text-muted">From his camera roll.</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-6">
            {(
              [
                ["46", "47"],
                ["48", "49"],
              ] as const
            ).map((pair) => (
              <div key={pair[0]} className="grid grid-cols-2 gap-1.5 rounded-[10px] border border-rule bg-ticket p-1.5">
                {pair.map((id) => (
                  <Photo
                    key={id}
                    id={id}
                    sizes="(min-width: 1024px) 290px, 46vw"
                    className="w-full rounded-md"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-dashed border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-[1.25rem] sm:text-[1.5rem]">
            And more. <span className="text-muted">If it is on your list, ask.</span>
          </p>
          <QuoteButton />
        </div>
      </div>
    </section>
  );
}
