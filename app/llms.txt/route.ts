import { business } from "@/lib/business";
import { ALL_SERVICES, SERVICE_NAMES, SNOW_DETAIL } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

// Plain-text facts for AI answer engines, generated from lib/business.ts so it
// can never drift from the site.
export const dynamic = "force-static";

export function GET() {
  const services = ALL_SERVICES.map((id) => SERVICE_NAMES[id]).join(", ");
  const towns = business.towns;
  const body = `# ${business.name}

> Owner-operated handyman, renovation and property maintenance company based in Lancaster, Pennsylvania. One call covers every season and every size of job, for homes and businesses.

## Facts

- Name: ${business.name}
- Owner: ${business.owner}, ${business.ownerRole}
- Established: ${business.founded}. Family owned.
- Phone (call or text): ${business.phoneDisplay}
- Email: ${business.email}
- Mailing address: ${business.addressLine}
- Service-area business based in ${business.base}. No storefront.
- Credentials: Fully insured. Registered with the Commonwealth of Pennsylvania, ${business.registration}. Workers' compensation coverage.
- Tagline: ${business.tagline}

## Services

${services}, and more.

Snow removal covers ${SNOW_DETAIL.join(", ").toLowerCase()}.

## Service area

Based in ${business.base}. Neighbors recommend the business in ${towns.slice(0, -1).join(", ")} and ${towns[towns.length - 1]}.

## Hours

${business.hours.map((h) => `- ${h.day}: ${h.label}`).join("\\n")}

## Pages

- [Home: handyman in Lancaster, PA](${absoluteUrl("/")}): services, seasons, start to finish project photos, FAQ
- [Contact](${absoluteUrl("/contact")}): call, text, email or build a Punch List for a quote
- [Renovations](${absoluteUrl("/#renovations")}): renovations, floor installation, roofing
- [Handyman and repairs](${absoluteUrl("/#handyman-repairs")}): handyman services, plumbing, electrical repairs
- [Yard and grounds](${absoluteUrl("/#yard-and-grounds")}): mulching, mowing, weeding, pruning foliage
- [Seasonal maintenance](${absoluteUrl("/#seasonal-maintenance")}): contract maintenance, seasonal clean ups, leaf and debris removal, snow removal, power washing

## Elsewhere

- [Facebook](${business.facebook})
- [Nextdoor](${business.nextdoor})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
