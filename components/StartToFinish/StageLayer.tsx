import { business } from "@/lib/business";
import type { PhotoId } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";

export const STAGE_SIZES = "(min-width: 768px) 520px, calc(100vw - 34px)";

// One stage photo. Stage 0 is always solid. Each later stage fades in on top of
// the one before it as the slider value (--v on the stage) passes, so there is
// never a dark dip between photos. The first stage carries "From this...", the
// last "To this.".
export function StageLayer({ index, total, photo }: { index: number; total: number; photo: PhotoId }) {
  const caption =
    index === 0 ? business.fromCaption : index === total - 1 ? business.toCaption : null;

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: index === 0 ? 1 : `clamp(0, calc(var(--v) - ${index - 1}), 1)` }}
    >
      <Photo id={photo} sizes={STAGE_SIZES} draggable={false} className="absolute inset-0 size-full object-cover" />
      {caption ? <span className="photo-caption">{caption}</span> : null}
    </div>
  );
}
