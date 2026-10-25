// Hairline SVG ornaments. Every stroke carries `data-draw` + pathLength=1 so
// GSAP can "draw" it by tweening stroke-dashoffset from 1 to 0.
// Without JS (or with reduced motion) they simply render fully drawn.

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

const square = (c: number, half: number) =>
  `M${c - half} ${c - half}H${c + half}V${c + half}H${c - half}Z`;

type SvgProps = {
  className?: string;
  /** Draw strokes when the svg scrolls into view */
  drawOnScroll?: boolean;
  strokeWidth?: number;
};

const Stroke = ({ d, transform }: { d: string; transform?: string }) => (
  <path d={d} transform={transform} pathLength={1} data-draw="" />
);

/** 8-point star rosette (two rotated squares + rings + rays) */
export const Rosette = ({
  className = "",
  drawOnScroll = false,
  strokeWidth = 0.5,
}: SvgProps) => {
  const c = 200;
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8;
    const r1 = 62;
    const r2 = i % 2 === 0 ? 148 : 112;
    return `M${c + Math.cos(a) * r1} ${c + Math.sin(a) * r1}L${c + Math.cos(a) * r2} ${c + Math.sin(a) * r2}`;
  });
  const tips = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    return circle(c + Math.cos(a) * 170, c + Math.sin(a) * 170, 5);
  });
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      data-draw-group={drawOnScroll ? "" : undefined}
    >
      <Stroke d={circle(c, c, 192)} />
      <Stroke d={circle(c, c, 186)} />
      <Stroke d={circle(c, c, 150)} />
      <Stroke d={square(c, 106)} />
      <Stroke d={square(c, 106)} transform={`rotate(45 ${c} ${c})`} />
      {rays.map((d) => (
        <Stroke key={d} d={d} />
      ))}
      <Stroke d={circle(c, c, 62)} />
      <Stroke d={square(c, 42.4)} />
      <Stroke d={square(c, 42.4)} transform={`rotate(45 ${c} ${c})`} />
      <Stroke d={circle(c, c, 18)} />
      {tips.map((d) => (
        <Stroke key={d} d={d} />
      ))}
    </svg>
  );
};

/** Corner flourish, mirrored via `flip` for each corner */
export const Corner = ({
  className = "",
  flip = "",
}: {
  className?: string;
  flip?: "" | "x" | "y" | "xy";
}) => {
  const scale = {
    "": "",
    x: "scale(-1,1)",
    y: "scale(1,-1)",
    xy: "scale(-1,-1)",
  }[flip];
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={className}
      style={scale ? { transform: scale } : undefined}
      aria-hidden="true"
    >
      <Stroke d="M2 118V42Q2 2 42 2H118" />
      <Stroke d="M12 104V50Q12 12 50 12H104" />
      <Stroke d="M30 22L38 30L30 38L22 30Z" />
      <Stroke d={circle(30, 30, 16)} />
    </svg>
  );
};

/** Pointed (mihrab) arch frame */
export const Arch = ({
  className = "",
  drawOnScroll = true,
  strokeWidth = 1,
}: SvgProps) => (
  <svg
    viewBox="0 0 200 264"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
    aria-hidden="true"
    data-draw-group={drawOnScroll ? "" : undefined}
    preserveAspectRatio="xMidYMid meet"
  >
    <Stroke d="M8 262V118C8 62 58 32 100 4C142 32 192 62 192 118V262" />
    <Stroke d="M20 262V122C20 72 64 46 100 20C136 46 180 72 180 122V262" />
    <Stroke d="M0 262H200" />
    <Stroke d="M100 30L106 36L100 42L94 36Z" />
  </svg>
);

/** Thin rule with a central diamond */
export const HairlineDivider = ({
  className = "",
  drawOnScroll = true,
}: {
  className?: string;
  drawOnScroll?: boolean;
}) => (
  <svg
    viewBox="0 0 320 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1}
    className={`block mx-auto w-full max-w-xs ${className}`}
    aria-hidden="true"
    data-draw-group={drawOnScroll ? "" : undefined}
  >
    <Stroke d="M0 12H136" />
    <Stroke d={circle(142, 12, 2)} />
    <Stroke d="M160 2L170 12L160 22L150 12Z" />
    <Stroke d="M160 7L165 12L160 17L155 12Z" />
    <Stroke d={circle(178, 12, 2)} />
    <Stroke d="M184 12H320" />
  </svg>
);

/** Concentric orbit rings for the closing section */
export const Orbits = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 600 600"
    fill="none"
    stroke="currentColor"
    strokeWidth={0.6}
    className={className}
    aria-hidden="true"
    data-draw-group=""
  >
    <Stroke d={circle(300, 300, 296)} />
    <Stroke d={circle(300, 300, 200)} />
    <Stroke d={circle(300, 300, 100)} />
    <g data-orbit="1">
      <path d={circle(300, 300, 248)} strokeDasharray="1 7" opacity={0.7} />
      <circle cx={300} cy={52} r={4} fill="currentColor" stroke="none" />
      <circle cx={300} cy={548} r={2.5} fill="currentColor" stroke="none" />
    </g>
    <g data-orbit="-1">
      <path d={circle(300, 300, 150)} strokeDasharray="2 10" opacity={0.7} />
      <circle cx={150} cy={300} r={3} fill="currentColor" stroke="none" />
    </g>
  </svg>
);
