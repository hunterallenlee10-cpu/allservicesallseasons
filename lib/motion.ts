// Framer Motion drives the only two motion pieces on the site: the hero sweep
// and the Start to Finish slider. It is loaded on demand, in its own chunk, so
// it never competes with the first paint on a phone.
type MotionDom = typeof import("framer-motion/dom");

let loading: Promise<MotionDom> | null = null;

export function loadMotion(): Promise<MotionDom> {
  loading ??= import("framer-motion/dom");
  return loading;
}

export type MotionControls = { stop: () => void };

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
