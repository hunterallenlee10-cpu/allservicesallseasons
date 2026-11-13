"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { business } from "@/lib/business";
import { loadMotion, prefersReducedMotion, type MotionControls } from "@/lib/motion";
import { Photo } from "@/components/ui/Photo";

const SIZES = "(min-width: 1024px) 560px, (min-width: 640px) 560px, calc(100vw - 34px)";

// Signature motion: "From this, to this".
// The bare patio sits underneath. A lime line sweeps left to right once and the
// finished gazebo is revealed behind it with a clip-path wipe. Each photo
// carries his own caption, so "To this." arrives as the line reaches the right
// edge. Afterwards the line is a handle the visitor can drag back to compare.
//
// One CSS variable (--pos, percent of the finished photo showing) drives the
// wipe, the line and the handle through clip-path and transform only, so the
// sweep causes no layout shift. Framer Motion animates that one number.
export function HeroCompare() {
  const frame = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const sweep = useRef<MotionControls | null>(null);
  const played = useRef(false);
  const tookOver = useRef(false);
  const dragging = useRef(false);

  const setPos = useCallback((value: number) => {
    const v = Math.min(100, Math.max(0, value));
    frame.current?.style.setProperty("--pos", `${v}%`);
    if (range.current) range.current.value = String(Math.round(v));
  }, []);

  useEffect(() => {
    const el = frame.current;
    if (!el || played.current) return;

    // Reduced motion: no sweep, just the finished state.
    if (prefersReducedMotion()) {
      played.current = true;
      setPos(100);
      return;
    }

    // Play once, when the card is actually on screen. On a phone the card
    // starts below the fold, so the sweep waits for it.
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        loadMotion().then(({ animate }) => {
          if (cancelled || tookOver.current) return;
          sweep.current = animate(0, 100, {
            delay: 0.6,
            duration: 1.2,
            ease: [0.65, 0, 0.35, 1],
            onUpdate: setPos,
          });
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      sweep.current?.stop();
    };
  }, [setPos]);

  function takeOver() {
    played.current = true;
    tookOver.current = true;
    sweep.current?.stop();
  }

  function setFromPointer(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(((clientX - rect.left) / rect.width) * 100);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    // A touch only moves the line once it travels sideways, so scrolling past
    // the photo never makes it jump.
    if (e.pointerType === "mouse") {
      takeOver();
      setFromPointer(e.clientX);
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    takeOver();
    setFromPointer(e.clientX);
  }

  function endDrag() {
    dragging.current = false;
  }

  return (
    <div
      ref={frame}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ "--pos": "0%" } as CSSProperties}
      className="relative aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-ticket"
    >
      {/* From this... */}
      <Photo id="04" sizes={SIZES} priority draggable={false} className="absolute inset-0 size-full object-cover" />
      <span className="photo-caption">{business.fromCaption}</span>

      {/* To this. */}
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
        <Photo id="08" sizes={SIZES} eager draggable={false} className="absolute inset-0 size-full object-cover" />
        <span className="photo-caption">{business.toCaption}</span>
      </div>

      <input
        ref={range}
        type="range"
        min={0}
        max={100}
        step={5}
        defaultValue={0}
        aria-label="Compare the patio before and after the gazebo. 0 is before, 100 is after."
        onChange={(e) => {
          takeOver();
          setPos(Number(e.target.value));
        }}
        className="peer sr-only"
      />

      {/* The sweep line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [transform:translateX(var(--pos))]"
      >
        <span className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-lime" />
      </div>
      {/* The handle stays fully inside the card even when the line is at an edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [transform:translateX(clamp(24px,var(--pos),calc(100%-24px)))] peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-paper"
      >
        <span className="absolute left-0 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] border-2 border-ink bg-lime text-ink">
          <ChevronsLeftRight className="size-5" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
