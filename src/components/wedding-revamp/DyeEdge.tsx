import { useRef } from "react";

import { gsap, ScrollTrigger, useIsoLayoutEffect } from "./motion";
import s from "./wr.module.css";

const STEP = 2.5; // polygon resolution along the edge, in %

/** Wavy top edge at progress p (0 hidden, 1 risen), as a clip-path polygon */
function edge(p: number, seed: number) {
  const rise = 1 - (1 - p) ** 2; // ease out
  const phase = p * 5 + seed;
  const amp = 7 + 9 * (1 - p); // calmer as it settles
  const pts: string[] = [];
  for (let x = 0; x <= 100; x += STEP) {
    const w =
      Math.sin(x * 0.07 + phase) +
      0.55 * Math.sin(x * 0.19 - phase * 1.4 + seed) +
      0.25 * Math.sin(x * 0.43 + phase * 0.7);
    const y = Math.min(100, Math.max(0, (1 - rise) * 100 + amp * (w + 0.2)));
    pts.push(`${x}% ${y.toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")},100% 100%,0% 100%)`;
}

/**
 * The next chapter's colour rising into the one above with an uneven edge,
 * like cloth lowered into a dye bath. Place as the first child of a chapter.
 * Hidden without script and under reduced motion: the chapters then meet flat.
 */
const DyeEdge = ({ seed = 0 }: { seed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return undefined;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const set = (p: number) => {
        el.style.clipPath = edge(p, seed);
      };
      set(0);
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top 30%",
        scrub: true,
        onUpdate: (self) => set(self.progress),
        onRefresh: (self) => set(self.progress),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [seed]);

  return <div ref={ref} className={s.dye} aria-hidden="true" />;
};

export default DyeEdge;
