import { useRef, useState } from "react";

import type { Person } from "data/weddingConfig";
import { WEDDING } from "data/weddingConfig";

import { useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import SafeImg from "./SafeImg";
import s from "./wr.module.css";

// Arch outlines in a 3:4 box: the frame line sits 6 units outside the photo
const ARCH_OUT = "M1 132V66A49 64 0 0 1 99 66V132Z";

/** Arched portrait with a thin rose line drawn around it, like a card's inner border */
const Portrait = ({ person }: { person: Person }) => {
  const [failed, setFailed] = useState(!person.photo);
  return (
    <div
      className="relative mx-auto w-[min(68vw,15rem)]! aspect-[3/4]"
      data-slot="portrait 3:4"
    >
      <svg
        viewBox="0 0 100 133"
        className="absolute inset-0 w-full! h-full! overflow-visible"
        aria-hidden="true"
      >
        <path
          d={ARCH_OUT}
          fill="none"
          stroke="var(--c-rose)"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* the arch is on the wrapper: the reveal animates clip-path on the photo */}
      <div className="absolute inset-[6%]" style={{ clipPath: "url(#wr-arch)" }}>
        <div
          data-c-photo=""
          className="relative w-full! h-full! overflow-hidden"
          style={{ background: "var(--c-petal)" }}
        >
          {failed ? (
            <span
              className={`${s.names} absolute inset-0 flex items-center justify-center`}
              aria-hidden="true"
            >
              {person.short[0]}
            </span>
          ) : (
            <SafeImg
              src={person.photo}
              alt={person.full}
              width={600}
              height={800}
              className="absolute inset-0 w-full! h-full! max-w-none! object-cover"
              onFail={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const PersonBlock = ({ person }: { person: Person }) => {
  const { lang } = useLang();
  return (
    <div data-c-person="" className="flex flex-col items-center">
      <Portrait person={person} />
      <h3 className={`${s.script} mt-6! text-[2.6rem]! md:text-[3rem]!`}>
        {person.full}
      </h3>
      <p className={`${s.body} ${s.soft} mt-2! max-w-[20rem]!`}>
        {person.parents[lang]}
      </p>
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noreferrer"
          className={`${s.capsLink} mt-1! text-[0.75rem]!`}
          style={{ color: "var(--c-rose)" }}
        >
          @{person.instagram}
        </a>
      )}
    </div>
  );
};

const Couple = () => {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (q) => {
    q("[data-c-person]").forEach((person) => {
      gsap.fromTo(
        person.querySelector("[data-c-photo]"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "expo.inOut",
          scrollTrigger: { trigger: person, start: "top 80%", once: true },
        }
      );
    });
  });

  return (
    <section ref={ref} className={`${s.section} ${s.paper}`}>
      <div className={s.wrapWide}>
        <h2 className={s.script}>{t.coupleTitle}</h2>
        <p className={`${s.body} ${s.soft} mt-5! mx-auto! max-w-[30rem]!`}>
          {t.coupleIntro}
        </p>

        <div className="mt-14! grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-8 md:gap-6 items-start md:[&>p]:self-center">
          <PersonBlock person={WEDDING.groom} />
          <p className={`${s.names} text-[4rem]!`} aria-hidden="true">
            &amp;
          </p>
          <PersonBlock person={WEDDING.bride} />
        </div>
      </div>
    </section>
  );
};

export default Couple;
