import { useRef, useState } from "react";

import { useConfig } from "./config";
import { HeartSeal, Laurel } from "./Decor";
import { useLang } from "./i18n";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "./motion";
import s from "./wr.module.css";

type Props = {
  guest: string;
  /** Runs inside the tap gesture: start music, ask for tilt permission */
  onOpenStart: () => void;
  /** The cover starts fading: time to start the opening view */
  onReveal: () => void;
  /** The cover has fully left the screen */
  onDone: () => void;
};

// The flap lives in a 400 x 240 box. Its edge falls from the top corners and
// runs in, scalloped, to the point where the seal sits.
const W = 400;
const H = 240;
const TIP = { x: 200, y: 196 };

function edgePoints() {
  const n = 18;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    pts.push({
      x: 2 * (1 - t) * t * 60 + t * t * TIP.x,
      y: 2 * (1 - t) * t * 150 + t * t * TIP.y,
    });
  }
  return pts;
}

/** Scalloped edge path, scaled into the given box (1,1 for objectBoundingBox) */
function flapPath(sx: number, sy: number) {
  const left = edgePoints();
  const right = [...left].reverse().map((p) => ({ x: W - p.x, y: p.y }));
  const all = [...left, ...right.slice(1)];
  const f = (v: number) => v.toFixed(4);
  let d = `M${f(all[0].x * sx)} ${f(all[0].y * sy)}`;
  for (let i = 1; i < all.length; i += 1) {
    const a = all[i - 1];
    const b = all[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    // bump outward (away from the flap, i.e. downward)
    const side = b.x <= TIP.x ? 1 : -1;
    const cx = (a.x + b.x) / 2 + (-dy / len) * 3.2 * side;
    const cy = (a.y + b.y) / 2 + (dx / len) * 3.2 * side;
    d += `Q${f(cx * sx)} ${f(cy * sy)} ${f(b.x * sx)} ${f(b.y * sy)}`;
  }
  return d;
}

const EDGE = flapPath(1, 1);
// The edge runs corner to corner, so closing it along the top gives the flap
const CLIP = `${flapPath(1 / W, 1 / H)}Z`;

/** Laurels laid along the flap edge, embossed into the velvet */
const FlapLaurels = () => (
  <g className={s.emboss} style={{ color: "#5c1118" }}>
    <Laurel length={90} leaves={7} leafScale={1.9} transform="translate(178 176) rotate(-162)" />
    <Laurel length={86} leaves={7} leafScale={1.9} transform="translate(96 146) rotate(-142)" />
    <Laurel length={70} leaves={6} leafScale={1.9} transform="translate(40 100) rotate(-115)" />
    <g transform={`translate(${W} 0) scale(-1 1)`}>
      <Laurel length={90} leaves={7} leafScale={1.9} transform="translate(178 176) rotate(-162)" />
      <Laurel length={86} leaves={7} leafScale={1.9} transform="translate(96 146) rotate(-142)" />
      <Laurel length={70} leaves={6} leafScale={1.9} transform="translate(40 100) rotate(-115)" />
    </g>
  </g>
);

/**
 * The cover: the back of a burgundy velvet envelope, the flap edge pressed
 * with laurels and closed with a heart-shaped wax seal. Tapping lifts the
 * seal, swings the flap up and away, and fades into the invitation.
 */
const Envelope = ({ guest, onOpenStart, onReveal, onDone }: Props) => {
  const cfg = useConfig();
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);
  const names = `${cfg.groom.short} & ${cfg.bride.short}`;

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-flap]", { yPercent: -6, autoAlpha: 0, duration: 1.4 })
        .from(
          "[data-seal]",
          { scale: 1.5, autoAlpha: 0, duration: 0.7, ease: "power2.in" },
          0.6
        )
        .from(
          "[data-env-text]",
          { y: 14, autoAlpha: 0, duration: 0.9, stagger: 0.1 },
          0.8
        );
    }, el);
    return () => ctx.revert();
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart();
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      onReveal();
      gsap.to(el, { autoAlpha: 0, duration: 0.4, onComplete: onDone });
      return;
    }

    const q = gsap.utils.selector(el);
    gsap
      .timeline({ onComplete: onDone })
      .to(q("[data-env-text]"), { autoAlpha: 0, y: -8, duration: 0.6 }, 0)
      .to(
        q("[data-seal]"),
        { scale: 1.12, duration: 0.25, ease: "power2.out" },
        0
      )
      .to(
        q("[data-seal]"),
        { y: -30, scale: 0.6, autoAlpha: 0, duration: 0.55, ease: "power2.in" },
        0.25
      )
      .to(
        q("[data-flap]"),
        {
          rotateX: 178,
          transformPerspective: 1600,
          duration: 1.3,
          ease: "power2.inOut",
        },
        0.55
      )
      .call(onReveal, [], 1.55)
      .to(el, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" }, 1.55);
  };

  return (
    <div
      ref={root}
      className={`${s.velvet} fixed inset-0 z-50 overflow-hidden`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id="wr-flap" clipPathUnits="objectBoundingBox">
          <path d={CLIP} />
        </clipPath>
      </svg>

      {/* the flap, cropped at the sides on phones */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "max(min(100vw, 125svh), 110svh)",
          aspectRatio: `${W} / ${H}`,
        }}
      >
        <div data-flap="" className={`${s.flap} absolute inset-0`}>
          <div className={`${s.flapShadow} absolute inset-0`}>
            <div
              className={`${s.velvet} absolute inset-0`}
              style={{
                clipPath: "url(#wr-flap)",
                backgroundPosition: "37px 91px, 0 0",
              }}
            />
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 w-full! h-full! overflow-visible"
            aria-hidden="true"
          >
            {/* a lit lip along the fold */}
            <path
              d={EDGE}
              fill="none"
              stroke="rgba(255,190,185,0.22)"
              strokeWidth="0.9"
              transform="translate(-0.4 -0.8)"
            />
            <FlapLaurels />
          </svg>
        </div>

        {/* the wrapper places the seal; GSAP animates only the button inside */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: "50%",
            top: `${(TIP.y / H) * 100 + 1.5}%`,
            width: "17%",
          }}
        >
          <button
            type="button"
            data-seal=""
            onClick={open}
            aria-label={t.open}
            className="group block w-full! cursor-pointer"
          >
            <HeartSeal className="w-full! h-auto! transition-transform duration-300 group-hover:scale-105" />
          </button>
        </div>
      </div>

      <div
        className="absolute inset-x-0 text-center px-[var(--gutter)]!"
        style={{ top: "clamp(4.5rem, 20svh, 11rem)" }}
      >
        <p data-env-text="" className={s.caps} style={{ fontSize: "0.95rem" }}>
          {t.withLove}
        </p>
        <h1
          data-env-text=""
          className={`${s.names} mt-2!`}
          style={{ fontSize: "clamp(3rem, 2rem + 4.5vw, 5.25rem)" }}
        >
          {names}
        </h1>
      </div>

      <div
        className="absolute inset-x-0 text-center px-[var(--gutter)]!"
        style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <p data-env-text="" className={`${s.caps} opacity-75`}>
          {t.dear}
        </p>
        <p data-env-text="" className={`${s.lead} mt-1!`}>
          {guest || t.defaultGuest}
        </p>
        <button
          type="button"
          data-env-text=""
          onClick={open}
          className={`${s.capsLink} mt-3! opacity-90`}
        >
          {t.open}
        </button>
      </div>
    </div>
  );
};

export default Envelope;
