import { useId } from "react";
import type { CSSProperties } from "react";

import { coupleOf, useConfig } from "./config";

/** Shared SVG defs: the arch for portraits and the torn-paper edge. Render once per page. */
export const WrDefs = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true">
    <clipPath id="wr-arch" clipPathUnits="objectBoundingBox">
      <path d="M0 1V0.5C0 0.22 0.22 0 0.5 0C0.78 0 1 0.22 1 0.5V1Z" />
    </clipPath>
    <filter id="wr-deckle" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.035"
        numOctaves="3"
        seed="4"
        result="n"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="n"
        scale="12"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// Leaf drawn along +x from its stalk, 17 units long
const LEAF = "M0 0C4-4.6 12-4.8 17 0C12 4.8 4 4.6 0 0Z";

type LaurelProps = {
  /** stem length in SVG units */
  length?: number;
  leaves?: number;
  className?: string;
  style?: CSSProperties;
  /** extra transform, e.g. to lay the branch along an edge */
  transform?: string;
  /** leaf size relative to the default */
  leafScale?: number;
};

/**
 * One laurel branch: a curved stem with alternating leaves and a few berries,
 * growing along +x from the origin. Coloured with currentColor; add the
 * `emboss` class on the parent for the pressed-into-velvet look.
 */
export const Laurel = ({
  length = 160,
  leaves = 9,
  className,
  style,
  transform,
  leafScale = 1,
}: LaurelProps) => {
  const sag = -length * 0.07;
  // quadratic stem from (0,0) through control (L/2, sag) to (L,0)
  const at = (t: number) => ({
    x: length * t,
    y: 2 * (1 - t) * t * sag,
    a: (Math.atan2(2 * sag * (1 - 2 * t), length) * 180) / Math.PI,
  });
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = (i + 0.7) / (leaves + 0.4);
    const p = at(t);
    const side = i % 2 === 0 ? -1 : 1;
    const scale = (1.25 - 0.5 * t) * (length / 160) * leafScale;
    return { ...p, side, scale, berry: i % 3 === 1 };
  });
  const tip = at(1);

  return (
    <g className={className} style={style} transform={transform}>
      <path
        d={`M0 0Q${length / 2} ${sag} ${length} 0`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6 * (length / 160)}
        strokeLinecap="round"
      />
      {items.map((it, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={i} transform={`translate(${it.x} ${it.y}) rotate(${it.a})`}>
          <g transform={`rotate(${it.side * 38}) scale(${it.scale})`}>
            <path d={LEAF} fill="currentColor" />
            <path
              d="M1.5 0H14"
              stroke="rgba(0,0,0,0.28)"
              strokeWidth="0.6"
              fill="none"
            />
          </g>
          {it.berry && (
            <g transform={`rotate(${-it.side * 62}) scale(${it.scale})`}>
              <path
                d="M0 0L7 0"
                stroke="currentColor"
                strokeWidth="0.9"
                fill="none"
              />
              <circle cx="9" cy="0" r="2.4" fill="currentColor" />
            </g>
          )}
        </g>
      ))}
      <g transform={`translate(${tip.x} ${tip.y}) rotate(${tip.a})`}>
        <path
          d={LEAF}
          fill="currentColor"
          transform={`scale(${0.75 * (length / 160) * leafScale})`}
        />
      </g>
    </g>
  );
};

/** Two branches meeting under a word, as on the invitation card */
export const LaurelPair = ({
  className,
  width = 72,
}: {
  className?: string;
  width?: number;
}) => (
  <svg
    viewBox="-60 -30 120 40"
    width={width}
    className={className}
    aria-hidden="true"
  >
    <Laurel length={52} leaves={6} leafScale={1.7} transform="translate(-2 4) rotate(-155)" />
    <Laurel
      length={52}
      leaves={6}
      leafScale={1.7}
      transform="translate(2 4) scale(-1 1) rotate(-155)"
    />
  </svg>
);

/** A divider between two parts of one field: a short laurel pair between hairlines */
export const LaurelRule = ({ className }: { className?: string }) => (
  <div
    className={`flex items-center justify-center gap-4 ${className ?? ""}`}
    style={{ color: "var(--accent)" }}
    aria-hidden="true"
  >
    <span className="h-px w-12! md:w-20! bg-current opacity-50" />
    <LaurelPair width={64} />
    <span className="h-px w-12! md:w-20! bg-current opacity-50" />
  </div>
);

/** The heart-shaped wax seal with the couple's initials pressed into it */
export const HeartSeal = ({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) => {
  const cfg = useConfig();
  const text = label ?? coupleOf(cfg).initials;
  const id = useId().replace(/:/g, "");
  const HEART =
    "M50 90C21 69 3 50 3 29C3 13 15 3 29 3C39 3 46 9 50 17C54 9 61 3 71 3C85 3 97 13 97 29C97 50 79 69 50 90Z";
  return (
    <svg
      viewBox="0 0 100 94"
      className={className}
      style={{ overflow: "visible", filter: "drop-shadow(0 5px 6px rgba(20,0,3,0.55))" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}w`} cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#b8505a" />
          <stop offset="0.45" stopColor="#8a2530" />
          <stop offset="1" stopColor="#4a0a12" />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e7a1a3" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#7a1c26" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2a0207" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g>
        <path d={HEART} fill={`url(#${id}w)`} />
        <path
          d={HEART}
          fill="none"
          stroke={`url(#${id}r)`}
          strokeWidth="4"
        />
        <path
          d={HEART}
          fill="none"
          stroke="rgba(30,0,6,0.45)"
          strokeWidth="1.2"
          transform="translate(50 47) scale(0.78) translate(-50 -47)"
        />
      </g>
      <text
        x="50"
        y="45"
        textAnchor="middle"
        fontSize="21"
        fill="#f0b3b2"
        style={{
          fontFamily: "var(--f-caps)",
          letterSpacing: "0.02em",
          filter: "drop-shadow(0.5px 0.8px 0 rgba(30,0,6,0.8))",
        }}
      >
        {text}
      </text>
      <g style={{ color: "#c87479" }}>
        <Laurel length={20} leaves={5} transform="translate(49 62) rotate(-160)" />
        <Laurel
          length={20}
          leaves={5}
          transform="translate(51 62) scale(-1 1) rotate(-160)"
        />
      </g>
    </svg>
  );
};

/** Tiny heart for the timeline */
export const HeartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 22" className={className} aria-hidden="true">
    <path
      d="M12 21C5 15.5 1 11.6 1 7.1 1 3.7 3.6 1 7 1c2 0 3.8 1 5 2.6C13.2 2 15 1 17 1c3.4 0 6 2.7 6 6.1 0 4.5-4 8.4-11 13.9Z"
      fill="currentColor"
    />
  </svg>
);

// Small deterministic random, so server and client draw the same sprig
const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// every third blossom is dusty blue, the page's one cool accent
const Blossom = ({
  x,
  y,
  r,
  rot,
  blue,
}: {
  x: number;
  y: number;
  r: number;
  rot: number;
  blue?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy={-r * 0.62}
        rx={r * 0.42}
        ry={r * 0.62}
        transform={`rotate(${a})`}
        fill={blue ? "var(--c-dusk)" : "#fbf3ea"}
        stroke="rgba(150,90,80,0.35)"
        strokeWidth="0.4"
      />
    ))}
    <circle r={r * 0.24} fill={blue ? "#fbf3ea" : "#8a2a33"} />
  </g>
);

/**
 * A spray of small cream blossoms on wine-red twigs, like the baby's breath in
 * the template's corners. Grows from the bottom-left of its box toward the top-right.
 */
export const Sprig = ({
  className,
  seed = 3,
  style,
}: {
  className?: string;
  seed?: number;
  style?: CSSProperties;
}) => {
  const r = rand(seed * 9973 + 17);
  const twigs: string[] = [];
  const flowers: { x: number; y: number; r: number; rot: number }[] = [];
  // main stem
  const main = { x0: 6, y0: 194, x1: 190, y1: 20 };
  twigs.push(`M${main.x0} ${main.y0}Q70 90 ${main.x1} ${main.y1}`);
  for (let i = 0; i < 11; i += 1) {
    const t = 0.18 + (i / 11) * 0.8;
    // point on the main quadratic
    const bx = (1 - t) ** 2 * main.x0 + 2 * (1 - t) * t * 70 + t * t * main.x1;
    const by = (1 - t) ** 2 * main.y0 + 2 * (1 - t) * t * 90 + t * t * main.y1;
    const side = i % 2 === 0 ? -1 : 1;
    const len = 22 + r() * 26;
    const ang = -45 + side * (40 + r() * 25);
    const ex = bx + Math.cos((ang * Math.PI) / 180) * len;
    const ey = by + Math.sin((ang * Math.PI) / 180) * len;
    twigs.push(`M${bx.toFixed(1)} ${by.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`);
    const n = 2 + Math.floor(r() * 3);
    for (let k = 0; k < n; k += 1) {
      const fx = ex + (r() - 0.5) * 16;
      const fy = ey + (r() - 0.5) * 16;
      twigs.push(`M${ex.toFixed(1)} ${ey.toFixed(1)}L${fx.toFixed(1)} ${fy.toFixed(1)}`);
      flowers.push({ x: fx, y: fy, r: 4.2 + r() * 2.6, rot: r() * 72 });
    }
  }
  flowers.push({ x: main.x1, y: main.y1, r: 6, rot: 10 });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{
        overflow: "visible",
        filter: "drop-shadow(2px 5px 4px rgba(66,40,29,0.28))",
        ...style,
      }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#7a2630" strokeWidth="1.3" strokeLinecap="round">
        {twigs.map((d, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <path key={i} d={d} strokeWidth={i === 0 ? 2.2 : 1.1} />
        ))}
      </g>
      {flowers.map((f, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Blossom key={i} {...f} blue={i % 3 === 1} />
      ))}
    </svg>
  );
};
