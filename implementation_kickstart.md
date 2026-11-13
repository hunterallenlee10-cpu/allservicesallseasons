# All Services All Seasons, LLC: implementation kickstart

Concept site for All Services All Seasons, LLC (Lancaster, PA). Front end only.
One goal: every action leads to **Get My Quote**, which opens the Punch List.
Call or text (717) 459-3552 is the always-visible second path.

## Direction: "Hi-Vis Punch List"

A contractor's clipboard at 7am. Matte work-jacket black, one hi-vis lime taken
from the hoodie on his logo, job-ticket cards with checkboxes that get ticked off.

### Tokens

| Token | Value | Use |
|---|---|---|
| `ink` | `#0E100C` | Page background, text on lime and on paper |
| `ticket` | `#181B15` | Card surface |
| `rule` | `#2A2E24` | 1px borders |
| `lime` | `#CAD945` | Primary button, ticked checkboxes, key numbers, active states, hero sweep line, slider |
| `paper` | `#F4F3EA` | Text on dark. Background of the Our Work band and the contact page builder |
| `muted` | `#A6A998` | Secondary text on dark |

- Fonts: Archivo (700 and 800, width axis 125, wide capitals) for display. Figtree (400, 500, 600) for body.
- Ticket card: flat `ticket` fill, 1px `rule` border, 10px radius, small caps label top left, square checkbox where it makes sense. No shadows, glass, gradients or glow.
- Spacing: 8px grid. Sections 112 to 128px desktop, 72px mobile.
- Icons: `lucide-react`, one stroke width.
- Motion in two places only: the hero "From this, to this" sweep and the Start to Finish slider. Everything else is hover and press states. `prefers-reduced-motion` respected.
- On paper, lime is only a fill behind dark text.

## Architecture

- Next.js App Router, TypeScript, Tailwind CSS v4. Framer Motion only in the hero sweep and Start to Finish.
- `lib/business.ts` (facts), `lib/services.ts` (services, groups, seasons), `lib/projects.ts` (stories), `lib/gallery.ts` (Our Work), `lib/photos.ts` (alt text and sizes), `lib/site.ts` (launch switch), `lib/schema.ts` (JSON-LD).
- `components/sections/*` one file per section, `components/PunchList/*`, `components/StartToFinish/*`, `components/layout/*`, `components/ui/*`. No file over 500 lines.
- Photos: `assets/raw` (owner's originals) to `public/images/*.webp` with responsive widths via `npm run images`. Plain `<img srcset>` with width and height. Nothing is ever shown larger than its native size.
- Launch switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and `NEXT_PUBLIC_SITE_URL`.
- Season logic: Nov to Mar winter, Apr to May spring, Jun to Aug summer, Sep to Oct fall. Rendered on the server (revalidated hourly) and corrected on the client.

## Page structure

Season bar, nav, 1 Hero, 2 All services. All seasons., 3 Start to Finish, 4 Services bento,
5 Our Work (paper band), 6 Meet Eric, 7 How it works, 8 Seasonal band, 9 Reviews, 10 FAQ,
11 Final call to action, 12 Footer. Plus `/contact` and a real 404.

## Build order

- [x] Phase 0: assets downloaded, viewed, cropped and converted
- [ ] Phase 1: scaffold, tokens, fonts, season bar, nav, hero with the "From this, to this" sweep, footer
- [ ] Phase 2: Season Switch, Start to Finish with all eight projects
- [ ] Phase 3: services bento, Our Work with filters and lightbox
- [ ] Phase 4: Meet Eric, how it works, seasonal band, reviews, FAQ, final call to action
- [ ] Phase 5: Punch List, every button wired with the right pre-ticked jobs, prefilled SMS, mobile sticky bar, `/contact`
- [ ] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD, robots and sitemap, `llms.txt`, OG image, favicon, 404, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse, mobile and desktop, both modes, production build
- [ ] Phase 7: final review, commit, push

## Final review checklist

- [ ] The hero alone would sell the job. The sweep plays once. At 375px the headline and primary button are visible without scrolling.
- [ ] Start to Finish scrubs through all eight projects in the right order with mouse, touch and keyboard.
- [ ] The Season Switch opens on the season that matches today's date.
- [ ] Every "Get My Quote" button opens the Punch List with the right jobs ticked. Phone, text and email links work.
- [ ] Every item in "Things only this business has" is on the page.
- [ ] The company name is spelled "All Services All Seasons, LLC" everywhere.
- [ ] Zero em dashes, zero double hyphens in copy, zero stock or AI images, zero invented facts.
- [ ] Sample reviews, season grouping, seasonal wording, Nextdoor count and other draft copy are labelled or commented.
- [ ] No photo is shown larger than its native size. No caption adds a town, price or customer.
- [ ] Max 2 fonts, 3 colours plus text, motion in only 2 sections, no cursor effects, loading intro or glow.
- [ ] Mobile at 375px: no overflow, burger works, sticky call / text / quote bar works.
- [ ] Footer on both pages, concept line in demo mode. Demo serves `noindex, nofollow`. Live serves `index, follow`, the sitemap and no concept line.
- [ ] Open Graph image and favicon are his.
- [ ] Lighthouse SEO 100 in live mode, the other three 90 or higher. In demo mode the only failing SEO audit is indexing.
- [ ] One h1 per page with the service and the town. Unique titles and descriptions. JSON-LD validates and claims nothing untrue.
