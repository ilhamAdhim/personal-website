import { useRef } from "react";

import { WEDDING } from "data/weddingConfig";

import { HeartSeal, LaurelRule } from "./Decor";
import { useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import s from "./wr.module.css";

const DUA =
  "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ";

/** Last section, on velvet: thanks, the dua, the families, and the names sealed */
const Closing = () => {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (q) => {
    q("[data-cl-rise]").forEach((node) => {
      gsap.from(node, {
        y: 18,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
      });
    });
    gsap.from(q("[data-cl-seal]"), {
      scale: 1.4,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.in",
      scrollTrigger: { trigger: q("[data-cl-seal]")[0], start: "top 92%", once: true },
    });
  });

  return (
    <footer ref={ref} className={`${s.section} ${s.velvet} pb-14!`}>
      <div className={s.wrap}>
        <h2 data-cl-rise="" className={s.script}>
          {t.closingTitle}
        </h2>
        <p data-cl-rise="" className={`${s.body} mt-6!`}>
          {t.closingText}
        </p>

        <figure data-cl-rise="" className="mt-12!">
          <p className={`${s.arabic} text-[1.6rem]! md:text-[2rem]!`} dir="rtl" lang="ar">
            {DUA}
          </p>
          <blockquote className={`${s.body} italic mt-3!`}>
            &ldquo;{t.duaTranslation}&rdquo;
          </blockquote>
          <figcaption className={`${s.caps} mt-3! opacity-75`}>
            {t.duaSource}
          </figcaption>
        </figure>

        {WEDDING.turutMengundang.length > 0 && (
          <div data-cl-rise="" className="mt-14!">
            <LaurelRule />
            <h3 className={`${s.caps} mt-6!`}>{t.alsoInviting}</h3>
            <ul className={`${s.body} mt-3!`}>
              {WEDDING.turutMengundang.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        <p data-cl-rise="" className={`${s.caps} mt-16! opacity-80`}>
          {t.signed}
        </p>
        <p data-cl-rise="" className={`${s.names} mt-1!`}>
          {WEDDING.groom.short} &amp; {WEDDING.bride.short}
        </p>
        <div data-cl-seal="" className="mt-8! mx-auto! w-24!">
          <HeartSeal className="w-full! h-auto!" />
        </div>
        <p className={`${s.caps} mt-8! opacity-80`}>{WEDDING.hashtag}</p>
      </div>
    </footer>
  );
};

export default Closing;
