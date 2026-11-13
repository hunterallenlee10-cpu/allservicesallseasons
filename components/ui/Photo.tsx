import { getPhoto, photoSrc, photoSrcSet, type PhotoId } from "@/lib/photos";

type Props = {
  id: PhotoId;
  // CSS sizes attribute. Keep the largest slot at or below the photo's native width.
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  draggable?: boolean;
};

// Plain responsive <img>. Variants are pre-built by scripts/build-images.mjs,
// so there is no runtime image optimiser and no layout shift.
export function Photo({ id, sizes, alt, priority = false, className, draggable }: Props) {
  const p = getPhoto(id);
  const fallback = p.widths.includes(828) ? 828 : undefined;
  return (
    <img
      src={photoSrc(id, fallback)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      draggable={draggable}
      className={className}
    />
  );
}
