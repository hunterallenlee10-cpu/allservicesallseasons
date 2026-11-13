import { business } from "@/lib/business";
import { Logo } from "@/components/ui/Logo";
import { Photo } from "@/components/ui/Photo";
import { TickBox, Ticket } from "@/components/ui/Ticket";

// Proof he is real: a stranger should know there is an accountable person
// behind the phone number.
export function MeetEric() {
  return (
    <section id="meet-eric" aria-labelledby="meet-eric-title" className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          {/* Photos: the crew at work, and a Lancaster row home. */}
          <div className="relative mx-auto w-full max-w-[600px] pb-16 pr-10 sm:pb-20 sm:pr-24 lg:mx-0">
            <figure>
              <div className="overflow-hidden rounded-[10px] border border-rule bg-ticket">
                {/* DRAFT: confirm who is in this photo. Never name the person in a caption. */}
                <Photo
                  id="07"
                  sizes="(min-width: 1024px) 500px, (min-width: 640px) 500px, calc(100vw - 74px)"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <figcaption className="label-caps mt-3 text-muted">On the job.</figcaption>
            </figure>
            <div className="absolute bottom-0 right-0 w-[46%] max-w-[260px] overflow-hidden rounded-[10px] border-[6px] border-ink bg-ticket">
              <Photo id="39" sizes="(min-width: 640px) 260px, 44vw" className="aspect-square w-full object-cover" />
            </div>
          </div>

          <div>
            <div className="flex items-end gap-5">
              <Logo className="h-[150px] sm:h-[180px]" />
              <p className="label-caps flex items-center gap-3 pb-2 text-muted">
                <span className="text-lime">05</span>
                <span aria-hidden="true" className="h-px w-8 bg-rule" />
                Meet Eric
              </p>
            </div>
            <h2 id="meet-eric-title" className="display mt-6 text-[clamp(1.75rem,6.6vw,3rem)]">
              Owner operated.
              <span className="block">{business.establishedLabel}.</span>
            </h2>
            <figure className="mt-7 border-l-2 border-rule pl-5 sm:pl-6">
              <blockquote className="text-xl leading-normal text-paper sm:text-[1.375rem]">
                <p>&ldquo;{business.mission}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 text-muted">
                <span className="font-semibold text-paper">{business.owner}</span>, {business.ownerRole}
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <Ticket label="On paper" aside={business.registration} className="lg:col-span-5">
            <ul className="grid gap-3">
              {business.credentials.map((fact) => (
                <li key={fact} className="flex items-start gap-3">
                  <TickBox className="mt-0.5" />
                  <span className="text-lg font-medium leading-snug">{fact}</span>
                </li>
              ))}
            </ul>
          </Ticket>

          {/* DRAFT: confirm hours */}
          <Ticket label="Hours" className="lg:col-span-3">
            <dl className="grid gap-1.5">
              {business.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-3">
                  <dt className="text-muted">{h.short}</dt>
                  <dd className="font-medium">{h.label}</dd>
                </div>
              ))}
            </dl>
          </Ticket>

          {/* DRAFT: confirm service area with the owner */}
          <Ticket label={`Based in ${business.base}`} className="lg:col-span-4">
            <p className="text-muted">Neighbors recommend us in:</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {business.towns.map((town) => (
                <li key={town} className="rounded-full border border-rule px-3 py-1 text-[0.9375rem] font-medium">
                  {town}
                </li>
              ))}
            </ul>
          </Ticket>
        </div>
      </div>
    </section>
  );
}
