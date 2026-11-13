import { getPhoto, photoSrc, photoSrcSet, type PhotoId } from "@/lib/photos";

type Props = {
  id: PhotoId;
  // CSS sizes attribute. Keep the largest slot at or below the photo's native width.
  sizes: string;
  alt?: string;
  priority?: boolean;
  // Load now, but let more important images go first.
  eager?: boolean;
  className?: string;
  draggable?: boolean;
};

// Plain responsive <img>. Variants are pre-built by scripts/build-images.mjs,
// so there is no runtime image optimiser and no layout shift.
export function Photo({ id, sizes, alt, priority = false, eager = false, className, draggable }: Props) {
  const p = getPhoto(id);
  const fallback = p.widths.includes(720) ? 720 : undefined;
  return (
    <img
      src={photoSrc(id, fallback)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : eager ? "low" : undefined}
      decoding="async"
      draggable={draggable}
      className={className}
    />
  );
}
