"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { getPhoto } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";

// Full-size viewer for Our Work. Arrow keys, Esc and swipe all work.
// A photo is never drawn larger than its native size.
export default function Lightbox({
  slides,
  index,
  onChange,
  onClose,
}: {
  slides: GalleryItem[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const total = slides.length;
  const item = slides[index];
  const photo = getPhoto(item.photo);

  const go = (delta: number) => onChange((index + delta + total) % total);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  function onPointerDown(e: ReactPointerEvent) {
    if (e.pointerType === "mouse") return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e: ReactPointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  }

  const navButton =
    "grid size-12 place-items-center rounded-[10px] border border-rule bg-ticket text-paper hover:border-paper";

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="quick-fade fixed inset-0 m-0 h-dvh w-full bg-ink p-0 text-paper"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
          <p className="label-caps text-muted" aria-live="polite">
            Photo <span className="text-lime">{index + 1}</span> of {total}
          </p>
          <button type="button" onClick={onClose} aria-label="Close the photo viewer" className={navButton}>
            <X className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div
          className="relative grid min-h-0 flex-1 touch-pan-y place-items-center px-4 sm:px-20"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <Photo
            key={item.photo}
            id={item.photo}
            sizes={`(min-width: 640px) min(${photo.width}px, calc(100vw - 160px)), calc(100vw - 32px)`}
            priority
            draggable={false}
            className="quick-fade max-h-full max-w-full h-auto w-auto rounded-[10px] object-contain"
          />
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className={`${navButton} absolute left-4 top-1/2 -translate-y-1/2 max-sm:hidden`}
          >
            <ChevronLeft className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className={`${navButton} absolute right-4 top-1/2 -translate-y-1/2 max-sm:hidden`}
          >
            <ChevronRight className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-3 px-4 py-4 sm:justify-center sm:px-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${navButton} sm:hidden`}>
            <ChevronLeft className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <p className="min-w-0 flex-1 text-center text-[0.9375rem] leading-snug sm:flex-none">{item.caption}</p>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${navButton} sm:hidden`}>
            <ChevronRight className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
