import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { business, seo } from "@/lib/business";
import { contactBreadcrumbSchema, JsonLd } from "@/lib/schema";
import { PunchListInline } from "@/components/PunchList/PunchListInline";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceAreaSketch } from "@/components/sections/ServiceAreaSketch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Ticket } from "@/components/ui/Ticket";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: seo.contact.title, description: seo.contact.description, url: "/contact" },
  twitter: { title: seo.contact.title, description: seo.contact.description },
};

export const revalidate = 3600;

const TILES = [
  {
    label: "Call",
    value: business.phoneDisplay,
    href: business.phoneHref,
    note: "The quickest way to reach us.",
    icon: Phone,
    cta: `Call ${business.phoneDisplay}`,
  },
  {
    label: "Text",
    value: business.phoneDisplay,
    href: business.smsHref,
    note: "Send your list. Photos help.",
    icon: MessageSquare,
    cta: `Text ${business.phoneDisplay}`,
  },
  {
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
    note: "For longer lists and details.",
    icon: Mail,
    cta: `Email ${business.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="border-b border-rule">
        <div className="shell pb-14 pt-8 sm:pt-12 lg:pb-20 lg:pt-20">
          <h1 id="contact-title">
            <span className="label-caps block text-muted">Contact your handyman in Lancaster, PA</span>
            <span className="display mt-4 block max-w-[18ch] text-[clamp(2rem,8.4vw,4rem)]">
              Tell us what is <span className="text-lime">on your list.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-normal text-muted">
            Call, text or email {business.shortName}, or build your Punch List below. Home repairs,
            renovations, yard work and snow removal around Lancaster, PA.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
            {TILES.map((tile) => (
              <li key={tile.label}>
                <a
                  href={tile.href}
                  aria-label={tile.cta}
                  className="group flex h-full flex-col rounded-[10px] border border-rule bg-ticket p-5 transition-colors hover:border-paper sm:p-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="label-caps text-muted">{tile.label}</span>
                    <tile.icon className="size-5 text-lime" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span
                    className={`mt-6 block break-all font-semibold ${
                      tile.label === "Email" ? "text-lg sm:text-xl" : "display text-[1.5rem] sm:text-[1.625rem]"
                    }`}
                  >
                    {tile.value}
                  </span>
                  <span className="mt-2 block text-muted">{tile.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The builder sits on the paper band. */}
      <section aria-labelledby="builder-title" className="section-y bg-paper text-ink">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div className="on-paper">
            <SectionHeading
              index="01"
              label="Punch List"
              id="builder-title"
              title="Build your list"
              sub="Four quick steps. Tick the jobs, tell us where and when, then text it straight to us."
              onPaper
            />
            <ul className="mt-8 grid gap-3 text-lg">
              {["What is on your list?", "Where is it?", "When?", "Your info"].map((step, i) => (
                <li key={step} className="flex items-center gap-4 border-b border-dashed border-ink/25 pb-3">
                  <span className="label-caps w-6 text-ink/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <PunchListInline />
        </div>
      </section>

      <section aria-labelledby="area-title" className="section-y">
        <div className="shell">
          <SectionHeading
            index="02"
            label="Where and when"
            id="area-title"
            title="Hours and service area"
            sub={`Based in ${business.base}. No storefront, we come to you.`}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
            <div className="grid content-start gap-4 lg:col-span-5 lg:gap-6">
              {/* DRAFT: confirm hours */}
              <Ticket label="Hours">
                <dl className="grid gap-2">
                  {business.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 border-b border-dashed border-rule pb-2 last:border-b-0 last:pb-0">
                      <dt className="text-muted">{h.day}</dt>
                      <dd className="font-medium">{h.label}</dd>
                    </div>
                  ))}
                </dl>
              </Ticket>
              <Ticket label="Mailing address">
                <address className="text-lg not-italic leading-normal">
                  <span className="font-semibold">{business.name}</span>
                  <br />
                  {business.address.box}
                  <br />
                  {business.address.city}, {business.address.region} {business.address.zip}
                </address>
                <p className="mt-4 text-muted">
                  <a href={business.phoneHref} className="font-semibold text-paper underline decoration-rule underline-offset-4 hover:decoration-paper">
                    {business.phoneDisplay}
                  </a>{" "}
                  call or text
                </p>
              </Ticket>
            </div>

            {/* DRAFT: confirm service area with the owner */}
            <Ticket label="Service area" className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-center">
                <ServiceAreaSketch className="mx-auto w-full max-w-[440px] sm:order-last" />
                <div>
                  <p className="text-muted">Neighbors recommend us in:</p>
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-lg font-medium sm:grid-cols-1">
                    {business.towns.map((town) => (
                      <li key={town}>{town}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-5 border-t border-dashed border-rule pt-4 text-muted">
                Not sure about your address? Call or text and ask.
              </p>
            </Ticket>
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={contactBreadcrumbSchema()} />
    </>
  );
}
