"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { loadMotion, prefersReducedMotion, type MotionControls } from "@/lib/motion";
import { photoSrcSet } from "@/lib/photos";
import { PROJECTS, type Project } from "@/lib/projects";
import { TickBox } from "@/components/ui/Ticket";
import { QuoteButton } from "@/components/ui/buttons";
import { StageLayer, STAGE_SIZES } from "./StageLayer";

const STEP = 100; // range units per stage

function preload(project: Project) {
  for (const stage of project.stages) {
    const img = new Image();
    img.sizes = STAGE_SIZES;
    img.srcset = photoSrcSet(stage.photo);
  }
}

// The show-stopper. Pick a job, then drag a real range input to scrub through
// his photos from the first stage to the last.
export function StartToFinish() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const project = PROJECTS[projectIndex];
  const total = project.stages.length;
  const last = total - 1;

  // The slider value: a float from 0 to the last stage. It lives in a ref and in
  // one CSS variable (--v) on the photo stage, which the stage photos read for
  // their opacity. Framer Motion animates the number.
  const value = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const stageEl = useRef<HTMLDivElement>(null);
  const motion = useRef<MotionControls | null>(null);
  const autoplayed = useRef(false);
  const lastRef = useRef(last);
  lastRef.current = last;

  // Keep the photos, the range input, the lime fill and the stage counter in step.
  const setValue = useCallback((next: number) => {
    const max = lastRef.current;
    const v = Math.min(max, Math.max(0, next));
    value.current = v;
    stageEl.current?.style.setProperty("--v", String(v));
    const el = input.current;
    if (el) {
      el.value = String(Math.round(v * STEP));
      el.style.setProperty("--stf-fill", `${max === 0 ? 0 : (v / max) * 100}%`);
    }
    setStage((prev) => {
      const nearest = Math.round(v);
      return prev === nearest ? prev : nearest;
    });
  }, []);

  const stop = useCallback(() => {
    autoplayed.current = true;
    motion.current?.stop();
  }, []);

  const goTo = useCallback(
    (target: number) => {
      stop();
      const clamped = Math.min(lastRef.current, Math.max(0, target));
      if (prefersReducedMotion()) {
        setValue(clamped);
        return;
      }
      loadMotion().then(({ animate }) => {
        motion.current?.stop();
        motion.current = animate(value.current, clamped, {
          duration: 0.28,
          ease: "easeOut",
          onUpdate: setValue,
        });
      });
    },
    [setValue, stop],
  );

  // Plays once through the gazebo, about 3 seconds, the first time it is on screen.
  useEffect(() => {
    // Watch the photo itself, so on a phone it starts when the photo is in view.
    const el = stageEl.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoplayed.current) return;
        autoplayed.current = true;
        io.disconnect();
        if (prefersReducedMotion()) return;
        loadMotion().then(({ animate }) => {
          // Only if the visitor has not already taken the slider.
          if (motion.current || value.current !== 0) return;
          motion.current = animate(0, PROJECTS[0].stages.length - 1, {
            delay: 0.4,
            duration: 3,
            ease: "easeInOut",
            onUpdate: setValue,
          });
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [setValue]);

  function pickProject(index: number) {
    if (index === projectIndex) return;
    stop();
    // Reset before the new project's (possibly shorter) stage list renders.
    lastRef.current = PROJECTS[index].stages.length - 1;
    setValue(0);
    setProjectIndex(index);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const current = Math.round(value.current);
    let target: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp") target = current + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown") target = current - 1;
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = last;
    if (target === null) return;
    e.preventDefault();
    goTo(target);
  }

  const label = project.stages[stage].label;
  const jobNo = String(projectIndex + 1).padStart(2, "0");

  return (
    <div>
      {/* Project chips. A horizontal scroll row on a phone. */}
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap" aria-label="Pick a job">
          {PROJECTS.map((p, i) => {
            const selected = i === projectIndex;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => pickProject(i)}
                  onPointerEnter={() => preload(p)}
                  onFocus={() => preload(p)}
                  className={`label-caps flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[10px] border px-3.5 transition-colors ${
                    selected
                      ? "border-lime bg-lime text-ink"
                      : "border-rule text-muted hover:border-muted hover:text-paper"
                  }`}
                >
                  <span className={selected ? "" : "text-paper"}>{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="mt-5 grid max-w-[1040px] overflow-hidden rounded-[10px] border border-rule bg-ticket md:grid-cols-[minmax(0,520px)_minmax(0,1fr)]"
      >
        {/* Photo stage */}
        <div
          ref={stageEl}
          style={{ "--v": 0 } as CSSProperties}
          className="relative aspect-square w-full select-none bg-ink"
        >
          {project.stages.map((s, i) => (
            <StageLayer key={`${project.id}-${i}`} index={i} total={total} photo={s.photo} />
          ))}
        </div>

        {/* Controls */}
        <div className="flex min-w-0 flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="label-caps text-muted">Job {jobNo}</span>
            <span className="label-caps text-muted" aria-hidden="true">
              Stage <span className="text-lime">{stage + 1}</span> of {total}
            </span>
          </div>
          <h3 className="display mt-3 text-[1.5rem] sm:text-[1.75rem]">{project.title}</h3>
          <p key={`${project.id}-${stage}`} className="quick-fade mt-2 text-xl font-semibold text-paper">
            {label}
          </p>

          <div className="relative mt-4">
            <input
              ref={input}
              type="range"
              min={0}
              max={last * STEP}
              step={1}
              defaultValue={0}
              aria-label={`${project.title}, start to finish`}
              aria-valuetext={`Stage ${stage + 1} of ${total}, ${label}`}
              onInput={(e) => {
                stop();
                setValue(Number(e.currentTarget.value) / STEP);
              }}
              onPointerUp={() => goTo(Math.round(value.current))}
              onTouchEnd={() => goTo(Math.round(value.current))}
              onBlur={() => goTo(Math.round(value.current))}
              onKeyDown={onKeyDown}
              className="stf-range relative z-10 block"
            />
            {/* One tick mark per stage, lined up with the thumb centre. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[14px] top-1/2 h-0">
              {project.stages.map((s, i) => (
                <span
                  key={s.photo}
                  className={`absolute top-[9px] h-2 w-0.5 -translate-x-1/2 rounded-full ${
                    i <= stage ? "bg-lime" : "bg-muted/50"
                  }`}
                  style={{ left: `${(i / last) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* The stages as a punch list. Each one ticks as the job passes it. */}
          <ol className="mt-3 hidden gap-0.5 md:grid">
            {project.stages.map((s, i) => (
              <li key={s.photo}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === stage ? "step" : undefined}
                  className={`-mx-2 flex min-h-11 w-[calc(100%+1rem)] items-center gap-3 rounded-md px-2 text-left hover:bg-paper/5 ${
                    i === stage ? "text-paper" : "text-muted"
                  }`}
                >
                  <TickBox checked={i <= stage} />
                  <span className="font-medium">{s.label}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex gap-2 md:mt-auto md:pt-5">
            <button
              type="button"
              onClick={() => goTo(stage - 1)}
              disabled={stage === 0}
              className="label-caps flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[10px] border border-rule text-paper hover:border-paper disabled:text-muted/50 disabled:hover:border-rule"
            >
              <ChevronLeft className="size-4" strokeWidth={2.25} aria-hidden="true" />
              Previous<span className="sr-only"> stage</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(stage + 1)}
              disabled={stage === last}
              className="label-caps flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[10px] border border-rule text-paper hover:border-paper disabled:text-muted/50 disabled:hover:border-rule"
            >
              Next<span className="sr-only"> stage</span>
              <ChevronRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex max-w-[1040px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="display text-[1.25rem] sm:text-[1.5rem]">Want one like this?</p>
        <QuoteButton tick={[project.quoteJob]} />
      </div>
    </div>
  );
}
