// Every business fact on the site lives here. Change it once, it changes everywhere.
// Sources: the owner's Facebook page, Nextdoor business page and current website.

export const business = {
  // Always "Seasons" with an s.
  name: "All Services All Seasons, LLC",
  shortName: "All Services All Seasons",
  owner: "Eric J. Totten",
  ownerRole: "owner operator",

  phoneDisplay: "(717) 459-3552",
  phoneE164: "+17174593552",
  phoneHref: "tel:+17174593552",
  smsHref: "sms:+17174593552",
  email: "allservicesllc21@gmail.com",

  // Service-area business. No street address, mailing address only.
  address: {
    box: "PO Box 6007",
    city: "Lancaster",
    region: "PA",
    zip: "17607",
    country: "US",
  },
  addressLine: "PO Box 6007, Lancaster, PA 17607",
  base: "Lancaster, PA",

  founded: "2021",
  establishedLabel: "Est. 2021",
  // DRAFT: confirm the registration number is current
  registration: "PA#169611",

  // His own lines.
  headline: ["Your problem?", "Our solution."] as const,
  tagline: "Services you can count on year-round.",
  fromCaption: "From this...",
  toCaption: "To this.",
  bigOrSmall: "We are here to offer All services whether big or small.",
  mission:
    "Our mission is to eliminate the stress, frustration and aggravation it takes to have a simple task completed around your home or business, especially the ones that pop up out of nowhere.",

  // Credentials, in his words.
  credentials: [
    "Fully insured.",
    "Registered with the Commonwealth of Pennsylvania, PA#169611.",
    "Workers' compensation coverage.",
    "Family owned.",
  ],

  facebook: "https://www.facebook.com/profile.php?id=61551984715597",
  nextdoor: "https://nextdoor.com/pages/all-services-all-hours-llc-lancaster-pa/",

  // DRAFT: confirm the count before launch, it changes. Read on 13 Nov 2026.
  nextdoor_neighborhoods: 122,
  nextdoor_winner_years: [2023, 2024, 2025],

  // DRAFT: confirm service area with the owner
  towns: [
    "Lancaster",
    "Lititz",
    "Mount Joy",
    "Columbia",
    "Manheim",
    "Mountville",
    "Landisville",
    "East Petersburg",
    "Millersville",
    "Willow Street",
    "Strasburg",
    "Ephrata",
    "Marietta",
    "Quarryville",
  ],

  // DRAFT: confirm hours (from his Nextdoor business page)
  hours: [
    { day: "Monday", short: "Mon", opens: "07:00", closes: "17:00", label: "7am to 5pm" },
    { day: "Tuesday", short: "Tue", opens: "08:00", closes: "17:00", label: "8am to 5pm" },
    { day: "Wednesday", short: "Wed", opens: "07:00", closes: "17:00", label: "7am to 5pm" },
    { day: "Thursday", short: "Thu", opens: "08:00", closes: "17:00", label: "8am to 5pm" },
    { day: "Friday", short: "Fri", opens: "08:00", closes: "17:00", label: "8am to 5pm" },
    { day: "Saturday", short: "Sat", opens: "09:00", closes: "13:00", label: "9am to 1pm" },
    { day: "Sunday", short: "Sun", opens: null, closes: null, label: "Closed" },
  ],
  hoursSentence:
    "Monday and Wednesday, 7am to 5pm. Tuesday, Thursday and Friday, 8am to 5pm. Saturday, 9am to 1pm. Closed Sunday.",
} as const;

export const townsSentence = (() => {
  const t = business.towns;
  return `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}`;
})();

export const seo = {
  home: {
    title: "Handyman in Lancaster, PA | All Services All Seasons, LLC",
    description:
      "All Services All Seasons, LLC handles home repairs, renovations, yard work and snow removal in Lancaster, PA. Fully insured. Call or text (717) 459-3552.",
  },
  contact: {
    title: "Contact All Services All Seasons | Handyman in Lancaster, PA",
    description:
      "Call or text All Services All Seasons at (717) 459-3552, or build your punch list online. Handyman and property maintenance in Lancaster, PA.",
  },
} as const;

// The visible FAQ and the FAQPage JSON-LD both read from this list, word for word.
export const faqs: { q: string; a: string }[] = [
  {
    q: "Is my job too small?",
    a: `No. "${business.bigOrSmall}" is how Eric describes the business. One task or a whole list, send it over.`,
  },
  {
    q: "What areas do you serve?",
    a: `We are based in Lancaster, PA. Neighbors recommend us in ${townsSentence}. Call or text ${business.phoneDisplay} to check your address.`,
  },
  {
    q: "Are you insured?",
    a: `Yes. ${business.name} is fully insured, registered with the Commonwealth of Pennsylvania (${business.registration}), and has workers' compensation coverage.`,
  },
  {
    q: "Do you do snow removal?",
    a: `Yes. Shoveling sidewalks and driveways, snow blowers and ice melt. Call or text ${business.phoneDisplay} to get on the list.`,
  },
  {
    q: "Do you work for businesses and property managers?",
    a: `Yes. We work on homes and businesses, and contract maintenance is one of our services. Call or text ${business.phoneDisplay} for details.`,
  },
  {
    q: "How do I get a quote?",
    a: `Build a Punch List on this site, or call or text ${business.phoneDisplay}.`,
  },
  {
    q: "What are your hours?",
    a: business.hoursSentence,
  },
];
