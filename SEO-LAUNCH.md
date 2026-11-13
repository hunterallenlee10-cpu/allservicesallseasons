# SEO launch checklist

The site ships in **demo mode**: `noindex, nofollow`, no sitemap, and the
"Concept preview by Lee Enterprises Unlimited." line in the footer. Nothing
below happens until launch day.

## 1. Flip the launch switch (Vercel, Project, Settings, Environment Variables)

- [ ] `NEXT_PUBLIC_SITE_MODE=live`
- [ ] `NEXT_PUBLIC_SITE_URL=https://the-real-domain.com` (no trailing slash)
- [ ] Redeploy. Environment variables only apply to new builds.

## 2. Confirm the switch worked

- [ ] View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`
- [ ] `/robots.txt` lists `Sitemap: https://the-real-domain.com/sitemap.xml`
- [ ] `/sitemap.xml` lists `/` and `/contact` with the real domain
- [ ] The canonical link on each page uses the real domain
- [ ] The footer no longer shows the concept preview line
- [ ] `/og-image.png` loads, and a link pasted into a text message shows the preview

## 3. Tell the search engines

- [ ] Google Search Console: add the property, verify, submit `/sitemap.xml`
- [ ] Bing Webmaster Tools: add the site, submit `/sitemap.xml`
- [ ] Create a Google Business Profile for All Services All Seasons, LLC (he does not appear to have one). Service-area business, no street address shown. Use the name, phone and hours exactly as in `lib/business.ts`, and link it to the site.
- [ ] Ask the owner to fix the website link on his Nextdoor page. It points to `allservicesallseason.com` (no s), which is not his domain.

## 4. Replace every DRAFT and sample item

Search the code for `DRAFT` and `Sample`. Each one needs the owner's answer.

- [ ] Service area and towns list (`lib/business.ts`)
- [ ] Hours (`lib/business.ts`)
- [ ] Registration number `PA#169611` is current (`lib/business.ts`)
- [ ] Nextdoor Neighborhood Favorite count, 122 when read on 13 Nov 2026 (`lib/business.ts`)
- [ ] Season grouping and seasonal wording (`lib/services.ts`)
- [ ] What the snow service covers (`lib/services.ts`)
- [ ] Order of the two deck steps photos (`lib/projects.ts`)
- [ ] Whether quotes are free and whether he visits first (`components/sections/HowItWorks.tsx`)
- [ ] Reply method and timing after a Punch List is sent (`components/PunchList/PunchListForm.tsx`)
- [ ] Example small jobs in the Punch List (`lib/services.ts`)
- [ ] Who is in photo 07 (`components/sections/MeetEric.tsx`)
- [ ] The mascot's name. The old logo file is called "Fred Green Shirt". The site does not name it.
- [ ] Sample reviews: replace with real Google reviews (`components/sections/Reviews.tsx`), then add `review` markup only if the reviews are real and shown on the page
- [ ] Real photos for snow removal, mowing, roofing, plumbing, electrical and flooring work
- [ ] Replace the stock snow removal photo on the Winter tab with a real one (`lib/services.ts`, `assets/stock/CREDITS.md`). It is labelled "Stock photo" on the page until then.
- [ ] Update the dates in `app/sitemap.ts` when content changes

## 5. Re-test

- [ ] Lighthouse on the live URL, mobile and desktop. SEO should be 100.
- [ ] Rich Results Test or validator.schema.org on `/` and `/contact`
