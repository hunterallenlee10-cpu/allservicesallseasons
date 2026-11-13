import { ArrowUpRight, Mail, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { ALL_SERVICES, SERVICE_NAMES } from "@/lib/services";
import { IS_LIVE } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-ink pb-24 md:pb-0">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <div className="flex items-end gap-5">
              <Logo className="h-[132px]" />
              <div className="pb-1">
                <p className="display text-[1.25rem] leading-[1.05] sm:text-[1.5rem]">
                  All Services
                  <br />
                  All Seasons, LLC
                </p>
                <p className="mt-2 text-muted">{business.tagline}</p>
              </div>
            </div>

            <a
              href={business.phoneHref}
              className="display mt-8 inline-flex min-h-11 items-center gap-3 text-[1.75rem] text-paper hover:text-lime sm:text-[2.25rem]"
            >
              <Phone className="size-6 shrink-0 text-lime" strokeWidth={2} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <ul className="mt-2 grid gap-0.5">
              <li>
                <a
                  href={business.smsHref}
                  className="inline-flex min-h-11 items-center gap-3 font-medium text-paper underline decoration-rule underline-offset-4 hover:decoration-paper"
                >
                  <MessageSquare className="size-4 text-muted" strokeWidth={2} aria-hidden="true" />
                  Text {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex min-h-11 items-center gap-3 break-all font-medium text-paper underline decoration-rule underline-offset-4 hover:decoration-paper"
                >
                  <Mail className="size-4 shrink-0 text-muted" strokeWidth={2} aria-hidden="true" />
                  {business.email}
                </a>
              </li>
            </ul>
            <address className="mt-3 not-italic text-muted">
              {business.name}
              <br />
              {business.addressLine}
            </address>

            <ul className="mt-6 flex flex-wrap gap-3">
              {[
                { href: business.facebook, name: "Facebook" },
                { href: business.nextdoor, name: "Nextdoor" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.shortName} on ${social.name}`}
                    className="label-caps inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-rule px-4 text-paper hover:border-paper"
                  >
                    {social.name}
                    <ArrowUpRight className="size-4 text-muted" strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="label-caps text-muted">Services</h2>
              <ul className="mt-4 columns-2 gap-x-6 text-paper sm:columns-1 xl:columns-2 [&>li]:mb-1.5 [&>li]:break-inside-avoid">
                {ALL_SERVICES.map((id) => (
                  <li key={id}>{SERVICE_NAMES[id]}</li>
                ))}
                <li className="text-muted">And more</li>
              </ul>
            </div>
            <div className="grid content-start gap-10">
              <div>
                <h2 className="label-caps text-muted">Hours</h2>
                <dl className="mt-4 grid gap-1.5">
                  {business.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 border-b border-dashed border-rule pb-1.5">
                      <dt className="text-muted">{h.day}</dt>
                      <dd>{h.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h2 className="label-caps text-muted">Based in Lancaster, PA</h2>
                <p className="mt-4 text-muted">
                  Neighbors recommend us in {business.towns.join(", ")}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-12 border-t border-rule pt-4">
          <ul className="flex flex-wrap gap-x-6">
            {[
              { href: "/#seasons", label: "Seasons" },
              { href: "/#start-to-finish", label: "Start to Finish" },
              { href: "/#services", label: "Services" },
              { href: "/#our-work", label: "Our Work" },
              { href: "/#meet-eric", label: "Meet Eric" },
              { href: "/#faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-medium text-muted hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 text-[0.875rem] text-muted">
          <p>
            © 2026 {business.name}. Fully Insured {business.registration}
          </p>
          {/* Demo mode only. Hidden when NEXT_PUBLIC_SITE_MODE=live. */}
          {IS_LIVE ? null : <p className="mt-1">Concept preview by Lee Enterprises Unlimited.</p>}
        </div>
      </div>
    </footer>
  );
}
