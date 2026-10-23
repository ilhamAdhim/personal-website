import { useRef } from "react";

import { LaurelRule } from "./Decor";
import { useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import s from "./wr.module.css";

const AR_RUM_21 =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";

/** Ar-Rum 21 on velvet. The translation lights up word by word as it is read. */
const Verse = () => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(
    ref,
    (q) => {
      gsap.fromTo(
        q("[data-v-word]"),
        { opacity: 0.22 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-v-words]")[0],
            start: "top 85%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    },
    [lang]
  );

  return (
    <section ref={ref} className={`${s.section} ${s.velvet}`}>
      <div className={s.wrap}>
        <LaurelRule />
        <p
          className={`${s.arabic} mt-10! text-[1.55rem]! md:text-[2rem]!`}
          dir="rtl"
          lang="ar"
        >
          {AR_RUM_21}
        </p>
        <figure className="mt-8!">
          <blockquote
            data-v-words=""
            className={`${s.lead} italic`}
          >
            {t.verse.split(" ").map((w, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`${w}-${i}`} data-v-word="">
                {w}{" "}
              </span>
            ))}
          </blockquote>
          <figcaption className={`${s.caps} mt-6! opacity-80`}>
            {t.verseSource}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Verse;
