import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Draw hairline strokes that use pathLength=1 */
export const drawIn = (targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) =>
  gsap.fromTo(
    targets,
    { strokeDasharray: "1 1", strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", ...vars }
  );

/**
 * Scoped GSAP setup for one section. `build` only runs when the visitor has not
 * asked for reduced motion; everything is reverted on unmount.
 */
export function useSectionMotion(
  ref: RefObject<HTMLElement>,
  build: (q: (sel: string) => HTMLElement[], el: HTMLElement) => void,
  deps: unknown[] = []
) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia(el);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (sel: string) =>
        gsap.utils.toArray<HTMLElement>(el.querySelectorAll(sel));
      build(q, el);
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Lenis smooth scroll wired into GSAP's ticker. Starts paused. */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return lenisRef;
}

/** Shared pointer / device-tilt state, read by the three.js lantern */
export const tilt = { x: 0, y: 0 };

let tiltBound = false;
export async function enableTilt() {
  if (typeof window === "undefined" || tiltBound) return;
  tiltBound = true;
  window.addEventListener("pointermove", (e) => {
    tilt.x = (e.clientX / window.innerWidth - 0.5) * 2;
    tilt.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  // iOS asks for permission, and only inside a user gesture (the envelope tap)
  const DOE = window.DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  try {
    if (DOE?.requestPermission) {
      const res = await DOE.requestPermission();
      if (res !== "granted") return;
    }
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma == null || e.beta == null) return;
      tilt.x = gsap.utils.clamp(-1, 1, e.gamma / 30);
      tilt.y = gsap.utils.clamp(-1, 1, (e.beta - 45) / 30);
    });
  } catch {
    // Tilt is a nice-to-have; pointer still works
  }
}
