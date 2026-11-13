"use client";

import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  GALLERY,
  GALLERY_FEATURE,
  GALLERY_FILTERS,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteButton } from "@/components/ui/buttons";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

const FIRST_BATCH = 12;

// Real photos only, on the paper band so photos of homes sit in daylight.
export function OurWork() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showFeature = filter === "all" || filter === GALLERY_FEATURE.category;
  const grid = useMemo(
    () => (filter === "all" ? GALLERY : GALLERY.filter((item) => item.category === filter)),
    [filter],
  );
  const visible = showAll || filter !== "all" ? grid : grid.slice(0, FIRST_BATCH);
  const hiddenCount = grid.length - visible.length;

  // Lightbox order: the feature first, then the grid as filtered.
  const slides: GalleryItem[] = useMemo(
    () => (showFeature ? [GALLERY_FEATURE, ...grid] : grid),
    [showFeature, grid],
  );
  const offset = showFeature ? 1 : 0;

  const counts = useMemo(() => {
    const all = [GALLERY_FEATURE, ...GALLERY];
    const map: Record<string, number> = { all: all.length };
    for (const item of all) map[item.category] = (map[item.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <section id="our-work" aria-labelledby="our-work-title" className="below-fold on-paper section-y bg-paper text-ink">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Real jobs, real photos"
          id="our-work-title"
          title="Our work"
          sub="Every photo here is from an All Services All Seasons job. Tap any one to see it full size."
          onPaper
        />

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Filter the photos">
          {GALLERY_FILTERS.map((f) => {
            const selected = f.id === filter;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f.id)}
                  className={`label-caps flex min-h-11 items-center gap-2 rounded-[10px] border px-3.5 transition-colors ${
                    selected ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"
                  }`}
                >
                  {f.label}
                  <span className={selected ? "text-paper/70" : "text-ink/60"}>{counts[f.id]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {showFeature ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-12 lg:gap-6">
            <figure className="lg:col-span-8">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label={`View full size: ${GALLERY_FEATURE.caption}`}
                className="block w-full overflow-hidden rounded-[10px] border border-ink/15 bg-ink/5"
              >
                <Photo
                  id={GALLERY_FEATURE.photo}
                  sizes="(min-width: 1280px) 780px, (min-width: 1024px) 64vw, calc(100vw - 34px)"
                  className="aspect-[2000/1080] w-full object-cover transition-opacity duration-150 hover:opacity-90"
                />
              </button>
              <figcaption className="mt-2 text-[0.9375rem] text-ink/75">{GALLERY_FEATURE.caption}</figcaption>
            </figure>
            <div className="flex flex-col justify-between gap-6 rounded-[10px] border border-ink/20 p-6 lg:col-span-4 lg:mb-8 lg:p-8">
              <div>
                <p className="label-caps text-ink/70">In this gallery</p>
                <p className="display mt-4 text-[4rem] leading-[0.9] sm:text-[5.5rem]">{counts.all}</p>
                <p className="mt-4 text-lg leading-normal">
                  Every one from a real job. Gazebos, basements, garden beds, mailboxes.
                </p>
              </div>
              <QuoteButton variant="dark" className="self-start" />
            </div>
          </div>
        ) : null}

        <ul className="mt-4 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {visible.map((item, i) => (
            <li key={item.photo} className="mb-4 break-inside-avoid">
              <figure>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i + offset)}
                  aria-label={`View full size: ${item.caption}`}
                  className="block w-full overflow-hidden rounded-[10px] border border-ink/15 bg-ink/5"
                >
                  <Photo
                    id={item.photo}
                    sizes="(min-width: 1024px) 284px, (min-width: 768px) 31vw, 46vw"
                    className="h-auto w-full transition-opacity duration-150 hover:opacity-90"
                  />
                </button>
                <figcaption className="mt-1.5 text-[0.875rem] leading-snug text-ink/75">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 ? (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="label-caps flex min-h-[52px] items-center gap-2 rounded-[10px] border border-ink px-6 text-ink hover:bg-ink hover:text-paper"
            >
              <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
              Show {hiddenCount} more photos
            </button>
          </div>
        ) : null}
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          slides={slides}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </section>
  );
}
