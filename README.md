# All Services All Seasons, LLC

Concept website for All Services All Seasons, LLC, an owner-operated handyman,
renovation and property maintenance company in Lancaster, PA. Front end only.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Production build:

```bash
npm run build
```

```bash
npm run start
```

## Launch switch

| Variable | Values | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` or `live` | `demo` |
| `NEXT_PUBLIC_SITE_URL` | Base URL, no trailing slash | Vercel production URL, or `http://localhost:3000` |

Demo mode serves `noindex, nofollow`, no sitemap, and the concept line in the
footer. Live mode is indexable. See `SEO-LAUNCH.md`.

## Where things live

- `lib/business.ts`: every business fact, FAQ answers, titles and descriptions
- `lib/services.ts`: the 15 services, the four groups, the season grouping
- `lib/projects.ts`: Start to Finish stories
- `lib/gallery.ts`: Our Work photos, categories and captions
- `lib/photos.ts`: alt text for every photo
- `components/sections/`: one file per page section
- `components/PunchList/`: the quote builder
- `components/StartToFinish/`: the project slider

## Photos

The owner's originals are in `assets/raw`. `npm run images` crops and converts
them to responsive WebP in `public/images` and writes `lib/photo-sizes.json`.
`npm run brand-assets` rebuilds the favicon and app icons from the logo.
The gallery and project stories use only the owner's own photos. One stand-in is used
where he has no photo yet: the Winter tab shows a public-domain stock photo, labelled
"Stock photo" on the page. Source and licence are in `assets/stock/CREDITS.md`.
