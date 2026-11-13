// Structured data. Server-rendered JSON-LD, built only from lib/business.ts.
// Only true things: no ratings, reviews, prices or awards.
import { business, faqs } from "./business";
import { LOGO } from "./photos";
import { GROUPS, SERVICE_NAMES } from "./services";
import { absoluteUrl } from "./site";

export const BUSINESS_ID = absoluteUrl("/#business");

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const areaServed = [
  { "@type": "AdministrativeArea", name: "Lancaster County, Pennsylvania" },
  ...business.towns.map((town) => ({ "@type": "City", name: `${town}, PA` })),
];

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: business.name,
    description:
      "Owner-operated handyman, renovation and property maintenance company based in Lancaster, PA. Fully insured.",
    slogan: business.tagline,
    url: absoluteUrl("/"),
    telephone: business.phoneE164,
    email: business.email,
    logo: absoluteUrl(LOGO.png),
    image: absoluteUrl("/og-image.png"),
    foundingDate: business.founded,
    founder: { "@type": "Person", name: business.owner, jobTitle: "Owner operator" },
    address: {
      "@type": "PostalAddress",
      postOfficeBoxNumber: business.address.box.replace("PO Box ", ""),
      streetAddress: business.address.box,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    areaServed,
    openingHoursSpecification: business.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: [business.facebook, business.nextdoor],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phoneE164,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": GROUPS.map((group) => ({
      "@type": "Service",
      "@id": absoluteUrl(`/#${group.id}`),
      name: group.title,
      serviceType: group.services.map((id) => SERVICE_NAMES[id]).join(", "),
      description: group.description,
      url: absoluteUrl(`/#${group.id}`),
      provider: { "@id": BUSINESS_ID },
      areaServed,
    })),
  };
}

export function contactBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
    ],
  };
}
