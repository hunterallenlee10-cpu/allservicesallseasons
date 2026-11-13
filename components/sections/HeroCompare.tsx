"use client";

import { ChevronsLeftRight } from "lucide-react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { business } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";

const SIZES = "(min-width: 1024px) 560px, (min-width: 640px) 560px, calc(100vw - 34px)";

// Signature motion: "From this, to this".
// The bare patio sits underneath. A lime line sweeps left to right once and the
// finished gazebo is revealed behind it with a clip-path wipe. Each photo
// carries his own caption, so "To this." arrives as the line reaches the right
// edge. Afterwards the line is a handle the visitor can drag back to compare.
export function HeroCompare() {
  const pos = useMotionValue(0); // percent of the finished photo showing
  const hidden = useTransform(pos, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${hidden}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;
  // The handle stays fully inside the card even when the line is at an edge.
  const handleLeft = useMotionTemplate`clamp(24px, ${pos}%, calc(100% - 24px))`;

  const frame = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const sweep = useRef<ReturnType<typeof animate> | null>(null);
  const played = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    const el = frame.current;
    if (!el || played.current) return;

    // Reduced motion: no sweep, just the finished state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      played.current = true;
      pos.set(100);
      return;
    }

    // Play once, when the card is actually on screen. On a phone the card
    // starts below the fold, so the sweep waits for it.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        sweep.current = animate(pos, 100, { delay: 0.6, duration: 1.2, ease: [0.65, 0, 0.35, 1] });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      sweep.current?.stop();
    };
  }, [pos]);

  useEffect(
    () =>
      pos.on("change", (v) => {
        if (range.current) range.current.value = String(Math.round(v));
      }),
    [pos],
  );

  function takeOver() {
    played.current = true;
    sweep.current?.stop();
  }

  function setFromPointer(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
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
      className="relative aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-ticket"
    >
      {/* From this... */}
      <Photo id="04" sizes={SIZES} priority draggable={false} className="absolute inset-0 size-full object-cover" />
      <span className="photo-caption">{business.fromCaption}</span>

      {/* To this. */}
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Photo id="08" sizes={SIZES} priority draggable={false} className="absolute inset-0 size-full object-cover" />
        <span className="photo-caption">{business.toCaption}</span>
      </motion.div>

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
          pos.set(Number(e.target.value));
        }}
        className="peer sr-only"
      />

      {/* The sweep line and its handle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-lime"
        style={{ left }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0 peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-paper"
        style={{ left: handleLeft }}
      >
        <span className="absolute left-0 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] border-2 border-ink bg-lime text-ink">
          <ChevronsLeftRight className="size-5" strokeWidth={2.5} />
        </span>
      </motion.div>
    </div>
  );
}
