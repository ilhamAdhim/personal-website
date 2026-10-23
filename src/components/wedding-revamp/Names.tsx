import { useEffect, useRef, useState } from "react";

import { WEDDING } from "data/weddingConfig";

import { LangSwitch } from "./Controls";
import { Laurel, LaurelPair, Sprig } from "./Decor";
import type { Lang } from "./i18n";
import { dateParts, useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import s from "./wr.module.css";

type Left = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Calendar months first, then the rest down to the second */
function timeLeft(target: Date, now: Date): Left {
  if (target <= now)
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  let months = 0;
  const cursor = new Date(now);
  for (;;) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > target) break;
    cursor.setTime(next.getTime());
    months += 1;
  }
  let rest = Math.floor((target.getTime() - cursor.getTime()) / 1000);
  const days = Math.floor(rest / 86400);
  rest -= days * 86400;
  const hours = Math.floor(rest / 3600);
  rest -= hours * 3600;
  const minutes = Math.floor(rest / 60);
  return { months, days, hours, minutes, seconds: rest - minutes * 60 };
}

function useCountdown(iso: string) {
  const [left, setLeft] = useState<Left | null>(null);
  useEffect(() => {
    const target = new Date(iso);
    const tick = () => setLeft(timeLeft(target, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return left;
}

const Countdown = () => {
  const { t } = useLang();
  const left = useCountdown(WEDDING.events[0].start);
  const keys = ["months", "days", "hours", "minutes", "seconds"] as const;
  return (
    <div
      className="mt-10! flex items-start justify-center gap-1 sm:gap-3"
      role="timer"
      aria-live="off"
    >
      {keys.map((k, i) => (
        <div key={k} className="flex items-start">
          {i > 0 && (
            <span
              className={`${s.countNum} px-1! sm:px-2!`}
              style={{ color: "var(--c-dusk)" }}
              aria-hidden="true"
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center min-w-[2.6rem] sm:min-w-[3.6rem]">
            <span className={`${s.countNum} ${s.tabular}`}>
              {left ? String(left[k]).padStart(2, "0") : "--"}
            </span>
            <span className={s.countLabel}>{t.units[k]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/** Silver-rimmed record hanging from a chain: the music switch */
const Pendant = ({
  playing,
  toggleMusic,
}: {
  playing: boolean;
  toggleMusic: () => void;
}) => {
  const { t } = useLang();
  return (
    <div data-n-pendant="" className="relative flex flex-col items-center -mt-[6%]!">
      <svg viewBox="0 0 60 70" className="w-[14%]! min-w-[44px]" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          // two strands of links meeting at the ring
          // eslint-disable-next-line react/no-array-index-key
          <g key={i}>
            <ellipse
              cx={8 + i * 3.1}
              cy={4 + i * 8.6}
              rx="2.4"
              ry="4.2"
              transform={`rotate(-20 ${8 + i * 3.1} ${4 + i * 8.6})`}
              fill="none"
              stroke="#c9c9c9"
              strokeWidth="1.3"
            />
            <ellipse
              cx={52 - i * 3.1}
              cy={4 + i * 8.6}
              rx="2.4"
              ry="4.2"
              transform={`rotate(20 ${52 - i * 3.1} ${4 + i * 8.6})`}
              fill="none"
              stroke="#c9c9c9"
              strokeWidth="1.3"
            />
          </g>
        ))}
        <circle cx="30" cy="66" r="3.2" fill="none" stroke="#d9d9d9" strokeWidth="1.6" />
      </svg>
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? t.music.on : t.music.off}
        aria-pressed={playing}
        className="relative w-[96px]! h-[96px]! md:w-[112px]! md:h-[112px]! rounded-full cursor-pointer"
        style={{
          background:
            "conic-gradient(from 30deg, #f4f4f4, #9a9a9a, #e9e9e9, #7c7c7c, #f4f4f4)",
          padding: 6,
          boxShadow: "0 10px 20px -8px rgba(30,10,10,0.55)",
        }}
      >
        <span
          className={`${playing ? s.vinylOn : s.vinyl} block w-full! h-full! rounded-full`}
          style={{
            background:
              "radial-gradient(circle, #d8d8d8 0 14%, #555 15% 17%, transparent 18%), repeating-radial-gradient(circle, #111 0 2px, #1d1d1d 2px 3px), #111",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 10 10" className="w-3! h-3!" aria-hidden="true">
            {playing ? (
              <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="#fff" />
            ) : (
              <path d="M2.5 1L9 5 2.5 9Z" fill="#fff" />
            )}
          </svg>
        </span>
        <span
          className={`${s.caps} absolute left-0 right-0 bottom-[16%] text-[0.7rem]! tracking-[0.3em]! text-white pointer-events-none`}
        >
          {t.play}
        </span>
      </button>
    </div>
  );
};

/** The opened envelope with the invitation card standing out of it */
const OpenEnvelope = () => {
  const { t, lang } = useLang();
  const d = dateParts(WEDDING.events[0].start, lang);
  return (
    <div
      data-n-env=""
      className="relative w-[min(84vw,420px)]! aspect-[300/250] overflow-hidden"
    >
      {/* back: the opened flap, its liner, the inside of the body */}
      <svg viewBox="0 0 300 250" className="absolute inset-0 w-full! h-full!" aria-hidden="true">
        <defs>
          <linearGradient id="wr-env-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5e1219" />
            <stop offset="1" stopColor="#3f070d" />
          </linearGradient>
          <linearGradient id="wr-env-front" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#6d1a22" />
            <stop offset="1" stopColor="#4a0c13" />
          </linearGradient>
        </defs>
        <path d="M14 108L150 6L286 108Z" fill="url(#wr-env-back)" />
        <path d="M30 108L150 22L270 108Z" fill="#4c1a17" />
        <rect x="14" y="106" width="272" height="144" fill="#3c070c" />
        <g className={s.emboss} style={{ color: "#a75a55" }}>
          <Laurel length={58} leaves={7} transform="translate(44 100) rotate(-38)" />
          <Laurel length={58} leaves={7} transform="translate(256 100) scale(-1 1) rotate(-38)" />
        </g>
      </svg>

      {/* the card */}
      <div
        data-n-card=""
        className="absolute left-[19%] right-[19%] top-[10%] h-[68%]! flex flex-col items-center justify-center text-center"
        style={{
          background: "#f9ece6",
          color: "var(--c-rose)",
          boxShadow: "0 6px 14px -6px rgba(40,5,10,0.5)",
          outline: "1px solid var(--c-dusk)",
          outlineOffset: "-7px",
        }}
      >
        <p className={`${s.caps} text-[0.5rem]! sm:text-[0.6rem]! opacity-80`}>
          {t.weInvite}
        </p>
        <p
          className={`${s.caps} mt-2! leading-[1.25]! tracking-[0.14em]!`}
          style={{ fontSize: "clamp(1rem, 0.7rem + 1.6vw, 1.5rem)", color: "#5a1a22" }}
        >
          {WEDDING.groom.short}
          <br />
          <span className="text-[0.7em]!">&amp;</span>
          <br />
          {WEDDING.bride.short}
        </p>
        <LaurelPair className="mt-1! opacity-80" width={46} />
        <p className={`${s.caps} mt-1! text-[0.5rem]! sm:text-[0.6rem]!`} style={{ color: "#5a1a22" }}>
          {d.day} {d.month} {d.year}
        </p>
      </div>

      {/* front pocket */}
      <svg viewBox="0 0 300 250" className="absolute inset-0 w-full! h-full!" aria-hidden="true">
        <path d="M14 118L150 196L286 118V250H14Z" fill="url(#wr-env-front)" />
        <path
          d="M14 250L140 184M286 250L160 184"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M14 118L150 196L286 118"
          stroke="rgba(255,200,190,0.25)"
          strokeWidth="0.8"
          fill="none"
        />
        <g className={s.emboss} style={{ color: "#b46a62" }}>
          <Laurel length={74} leaves={8} transform="translate(26 136) rotate(30)" />
          <Laurel length={74} leaves={8} transform="translate(274 136) scale(-1 1) rotate(30)" />
        </g>
      </svg>
    </div>
  );
};

/**
 * First section, on cream paper: the opened envelope with the card, the music
 * pendant, then the formal line, the names, the venue and a live countdown.
 */
const Names = ({
  revealed,
  setLang,
  playing,
  toggleMusic,
}: {
  revealed: boolean;
  setLang: (l: Lang) => void;
  playing: boolean;
  /** null when no music is configured */
  toggleMusic: (() => void) | null;
}) => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const first = WEDDING.events[0];
  const d = dateParts(first.start, lang);

  useSectionMotion(
    ref,
    (q) => {
      if (!revealed) {
        gsap.set(q("[data-n-env]"), { autoAlpha: 0, y: 40 });
        gsap.set(q("[data-n-card]"), { yPercent: 45 });
        gsap.set(q("[data-n-pendant]"), { autoAlpha: 0, y: -16 });
        gsap.set(q("[data-n-sprig]"), { autoAlpha: 0, scale: 0.92 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          q("[data-n-sprig]"),
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 1.6, stagger: 0.15 },
          0
        )
        .fromTo(
          q("[data-n-env]"),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.1 },
          0.1
        )
        // the card is drawn up out of the pocket
        .fromTo(
          q("[data-n-card]"),
          { yPercent: 45 },
          { yPercent: 0, duration: 1.4, ease: "power2.inOut" },
          0.6
        )
        .fromTo(
          q("[data-n-pendant]"),
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "back.out(1.6)" },
          1.4
        );

      q("[data-n-rise]").forEach((node) => {
        gsap.from(node, {
          y: 18,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });
    },
    [revealed]
  );

  return (
    <section ref={ref} className={`${s.paper} relative overflow-hidden`}>
      <div
        className={`${s.caps} absolute z-[3] right-[var(--gutter)]`}
        style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <LangSwitch setLang={setLang} />
      </div>

      <div data-n-sprig="" className="absolute -top-[2%] -left-[4%] w-[46vw]! max-w-[340px]! origin-top-left pointer-events-none">
        <Sprig seed={3} className="w-full! h-auto!" style={{ transform: "scaleY(-1)" }} />
      </div>
      {/* the envelope, one screen tall */}
      <div className="relative z-[1] min-h-[100svh]! flex flex-col items-center justify-center px-[var(--gutter)]! py-16!">
        <div data-n-sprig="" className="absolute bottom-0 -right-[4%] w-[46vw]! max-w-[340px]! origin-bottom-right pointer-events-none">
          <Sprig seed={8} className="w-full! h-auto!" style={{ transform: "scaleX(-1)" }} />
        </div>
        <OpenEnvelope />
        {toggleMusic && <Pendant playing={playing} toggleMusic={toggleMusic} />}
      </div>

      {/* the formal line */}
      <div className={`${s.section} pt-4! z-[1]`}>
        <div className={s.wrap}>
          <p data-n-rise="" className={s.smallCaps}>
            {t.invitedTo}
          </p>
          {t.of && (
            <p data-n-rise="" className={`${s.script} text-[2.6rem]! mt-1!`}>
              {t.of}
            </p>
          )}
          <h1 data-n-rise="" className={`${s.names} mt-2!`}>
            {WEDDING.groom.short} &amp; {WEDDING.bride.short}
          </h1>
          <p data-n-rise="" className={`${s.caps} mt-6!`} style={{ color: "var(--c-rose)" }}>
            {d.weekday}, {d.day} {d.month} {d.year}
          </p>
          <p data-n-rise="" className={`${s.caps} mt-4! leading-[1.9]!`} style={{ color: "var(--c-rose)" }}>
            {WEDDING.events.map((ev) => ev.venue).filter((v, i, a) => a.indexOf(v) === i).join(" & ")}
            <br />
            {first.address}
          </p>
          <div data-n-rise="">
            <Countdown />
          </div>
          <a data-n-rise="" href="#rsvp" className={`${s.capsLink} mt-10!`} style={{ color: "var(--c-rose)" }}>
            {t.rsvpCta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Names;
