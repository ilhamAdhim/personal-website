import { useRef, useState } from "react";

import { WEDDING } from "data/weddingConfig";

import { useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import SafeImg from "./SafeImg";
import s from "./wr.module.css";

const FilmFrame = ({ src }: { src: string }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="aspect-[3/5] overflow-hidden"
      style={{ background: "#3a2a28" }}
      data-slot="photo 3:5"
    >
      {!failed && (
        <SafeImg
          src={src}
          alt={`${WEDDING.groom.short} & ${WEDDING.bride.short}`}
          width={360}
          height={600}
          loading="lazy"
          className="w-full! h-full! max-w-none! object-cover"
          onFail={() => setFailed(true)}
        />
      )}
    </div>
  );
};

/** "Our Story" on velvet: three film frames, then each chapter of the story */
const Story = () => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const frames = WEDDING.gallery.slice(1, 4);

  useSectionMotion(ref, (q) => {
    gsap.from(q("[data-s-film] > *"), {
      y: 24,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: q("[data-s-film]")[0], start: "top 82%", once: true },
    });
    q("[data-s-rise]").forEach((node) => {
      gsap.from(node, {
        y: 18,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
      });
    });
  });

  return (
    <section ref={ref} className={`${s.section} ${s.velvet}`}>
      <div className={s.wrap}>
        <h2 data-s-rise="" className={s.script}>
          {t.storyTitle}
        </h2>

        {frames.length > 0 && (
          <div data-s-film="" className={`${s.film} mt-10! mx-auto! max-w-[27rem]!`}>
            {frames.map((src) => (
              <FilmFrame key={src} src={src} />
            ))}
          </div>
        )}

        <ol className="mt-14! space-y-10!">
          {WEDDING.story.map((item) => (
            <li key={item.year} data-s-rise="">
              <p className={`${s.caps} opacity-75 ${s.tabular}`}>
                {item.year} · {item.title[lang]}
              </p>
              <p className={`${s.body} mt-2!`}>{item.text[lang]}</p>
            </li>
          ))}
        </ol>

        <p data-s-rise="" className={`${s.script} mt-14! text-[2.75rem]!`}>
          {WEDDING.groom.short} &amp; {WEDDING.bride.short}
        </p>
      </div>
    </section>
  );
};

export default Story;
