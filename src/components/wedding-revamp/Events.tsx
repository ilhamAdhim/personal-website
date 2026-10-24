import { useRef, useState } from "react";

import type { WeddingEvent } from "data/weddingConfig";

import { useConfig } from "./config";
import { HeartIcon, LaurelRule } from "./Decor";
import { formatDate, formatTime, useLang } from "./i18n";
import { gsap, useSectionMotion } from "./motion";
import SafeImg from "./SafeImg";
import s from "./wr.module.css";

const icsDate = (iso: string) =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

/** iOS opens .ics straight into Calendar; everyone else gets Google Calendar */
function addToCalendar(ev: WeddingEvent, title: string, couple: string) {
  const summary = `${title}: ${couple}`;
  const location = `${ev.venue}, ${ev.address}`;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//IlhamFirda//Wedding//ID",
      "BEGIN:VEVENT",
      `UID:${ev.key}-${icsDate(ev.start)}@ilhamadhim`,
      `DTSTAMP:${icsDate(new Date().toISOString())}`,
      `DTSTART:${icsDate(ev.start)}`,
      `DTEND:${icsDate(ev.end)}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ev.key}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: summary,
    dates: `${icsDate(ev.start)}/${icsDate(ev.end)}`,
    location,
  });
  window.open(
    `https://calendar.google.com/calendar/render?${params}`,
    "_blank"
  );
}

/** The burgundy "Wedding Details" board with a polaroid tucked into its side */
const DetailsBoard = () => {
  const cfg = useConfig();
  const { t } = useLang();
  const [failed, setFailed] = useState(false);
  const photo = cfg.gallery[0];
  return (
    <div className="relative mx-auto w-[min(80vw,22rem)]! mb-16!">
      <div
        className={`${s.velvet} relative aspect-square rounded-[4px] flex items-start justify-center pt-[22%]!`}
        style={{ boxShadow: "0 22px 40px -18px rgba(60,10,15,0.65)" }}
      >
        <div
          className="absolute inset-[10px] rounded-[2px] pointer-events-none"
          style={{ border: "1px solid rgba(253,249,237,0.35)" }}
        />
        <h2 className={`${s.script} px-6!`}>{t.detailsTitle}</h2>
      </div>
      <div
        className={`${s.polaroid} absolute -right-[10%] top-[50%] w-[40%]! rotate-[7deg]`}
        aria-hidden="true"
      >
        <div className="aspect-[4/5] overflow-hidden" style={{ background: "var(--c-petal)" }}>
          {photo && !failed && (
            <SafeImg
              src={photo}
              alt=""
              width={400}
              height={500}
              loading="lazy"
              className="w-full! h-full! max-w-none! object-cover"
              onFail={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const EventBlock = ({ ev }: { ev: WeddingEvent }) => {
  const cfg = useConfig();
  const { t, lang } = useLang();
  return (
    <li data-e-rise="">
      <h3 className={`${s.script} text-[2.5rem]! md:text-[2.9rem]!`}>
        {ev.title[lang]}
      </h3>
      <p className={`${s.body} mt-2!`}>{formatDate(ev.start, lang)}</p>
      <p className={`${s.body} ${s.tabular}`}>
        {t.timeRange(formatTime(ev.start), formatTime(ev.end))}
      </p>
      <p className={`${s.caps} mt-4! text-[0.85rem]!`}>{ev.venue}</p>
      <p className={`${s.body} ${s.soft}`}>{ev.address}</p>
      <div className="mt-2! flex flex-wrap justify-center gap-x-6">
        <a
          href={ev.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={`${s.capsLink} text-[0.75rem]!`}
          style={{ color: "var(--c-rose)" }}
        >
          {t.map}
        </a>
        <button
          type="button"
          className={`${s.capsLink} text-[0.75rem]!`}
          style={{ color: "var(--c-rose)" }}
          onClick={() =>
            addToCalendar(
              ev,
              ev.title[lang],
              `${cfg.groom.short} & ${cfg.bride.short}`
            )
          }
        >
          {t.calendar}
        </button>
      </div>
    </li>
  );
};

/** Times down one rose line, alternating sides, a heart at each */
const Timeline = () => {
  const cfg = useConfig();
  const { t, lang } = useLang();
  return (
    <div data-e-rise="" className="mt-20!">
      <h3 className={`${s.script} text-[2.5rem]! md:text-[2.9rem]!`}>
        {t.timelineTitle}
      </h3>
      <ol className={`${s.timeline} mt-8! mx-auto! max-w-[22rem]!`}>
        {cfg.timeline.map((item, i) => (
          <li
            key={item.time}
            data-e-step=""
            className="relative grid grid-cols-[1fr_2.5rem_1fr] items-start min-h-[4.25rem]"
          >
            <span className={s.heart}>
              <HeartIcon className="w-full! h-full!" />
            </span>
            <div
              className={i % 2 === 0 ? "col-start-1 text-right" : "col-start-3 text-left"}
            >
              <p className={`${s.lead} ${s.tabular} leading-[1.2]!`} style={{ color: "var(--c-ink)" }}>
                {item.time}
              </p>
              <p className="text-[0.8rem]! tracking-[0.04em]!">{item.title[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

/** "Wedding Details": the board, a short note, each event, then the day's timeline */
const Events = () => {
  const cfg = useConfig();
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useSectionMotion(ref, (q) => {
    q("[data-e-rise]").forEach((node) => {
      gsap.from(node, {
        y: 20,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 86%", once: true },
      });
    });
    gsap.from(q("[data-e-step]"), {
      autoAlpha: 0,
      y: 10,
      stagger: 0.12,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: q("[data-e-step]")[0], start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} className={`${s.section} ${s.paper}`}>
      <div className={s.wrap}>
        <DetailsBoard />
        <p data-e-rise="" className={`${s.body} ${s.soft}`}>
          {t.detailsIntro}
        </p>

        <ul className="mt-14! space-y-14!">
          {cfg.events.map((ev) => (
            <EventBlock key={ev.key} ev={ev} />
          ))}
        </ul>

        <Timeline />
        <LaurelRule className="mt-20!" />
      </div>
    </section>
  );
};

export default Events;
