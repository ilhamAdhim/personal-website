import { useRef, useState } from "react";

import { WEDDING } from "data/weddingConfig";

import { Sprig } from "./Decor";
import { useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import SafeImg from "./SafeImg";
import s from "./wr.module.css";

// a slight, repeating lean so the prints look laid down by hand
const TILT = [-3, 2, -1.5, 3, -2.5, 1.5];

const Print = ({ src, index }: { src: string; index: number }) => {
  const [failed, setFailed] = useState(false);
  return (
    <li
      data-g-print=""
      className={s.polaroid}
      style={{ transform: `rotate(${TILT[index % TILT.length]}deg)` }}
    >
      <div
        className="aspect-[4/5] overflow-hidden"
        style={{ background: "var(--c-petal)" }}
        data-slot="photo 4:5"
      >
        {!failed && (
          <SafeImg
            src={src}
            alt={`${WEDDING.groom.short} & ${WEDDING.bride.short}`}
            width={600}
            height={750}
            loading="lazy"
            className="w-full! h-full! max-w-none! object-cover"
            onFail={() => setFailed(true)}
          />
        )}
      </div>
    </li>
  );
};

/** The couple's photos as polaroids on cream paper */
const Gallery = () => {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (q) => {
    gsap.from(q("[data-g-print]"), {
      y: 30,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: q("[data-g-print]")[0], start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} className={`${s.section} ${s.paper}`}>
      <div className="absolute -top-[1%] -right-[6%] w-[42vw]! max-w-[300px]! pointer-events-none">
        <Sprig seed={5} className="w-full! h-auto!" style={{ transform: "scale(-1,-1)" }} />
      </div>
      <div className={s.wrapWide}>
        <h2 className={s.script}>{t.galleryTitle}</h2>
        <ul className="mt-14! grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 px-1!">
          {WEDDING.gallery.map((src, i) => (
            <Print key={src} src={src} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Gallery;
