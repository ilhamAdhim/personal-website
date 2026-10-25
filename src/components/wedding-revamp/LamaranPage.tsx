import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { ENGAGEMENT } from "data/engagementConfig";

import { FamilyList } from "./Closing";
import { ConfigProvider, coupleOf } from "./config";
import { LangSwitch } from "./Controls";
import { HeartSeal, LaurelPair } from "./Decor";
import { addToCalendar } from "./Events";
import { fontVars } from "./fonts";
import type { Lang } from "./i18n";
import { dateParts, formatTime, LangProvider, useLang } from "./i18n";
import type { InvitationProps } from "./InvitationPage";
import MapFigure from "./MapFigure";
import { gsap, useSectionMotion } from "./motion";
import WeddingNotFound from "./NotFound";
import s from "./wr.module.css";

const WINE = "#621414"; // matches --c-wine
const cfg = ENGAGEMENT;
const couple = coupleOf(cfg);
const event = cfg.events[0];

/** Sabtu | 21 | November 2026, the way a printed card sets the date */
const DateLine = () => {
  const { lang } = useLang();
  const d = dateParts(event.start, lang);
  return (
    <div
      data-l-in=""
      className="mt-7! flex items-center justify-center"
      style={{ color: "var(--c-rose)" }}
    >
      <p
        className={`${s.caps} text-right`}
        style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em" }}
      >
        {d.weekday}
      </p>
      <p
        className={`${s.caps} ${s.tabular} mx-3! px-3! leading-none!`}
        style={{
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 11vw, 3.25rem)",
          borderInline:
            "1px solid color-mix(in oklab, var(--c-rose) 45%, transparent)",
        }}
      >
        {d.day}
      </p>
      <p
        className={`${s.caps} text-left leading-snug!`}
        style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em" }}
      >
        {d.month}
        <span className="block">{d.year}</span>
      </p>
    </div>
  );
};

const Content = ({
  guest,
  setLang,
}: {
  guest: string;
  setLang: (l: Lang) => void;
}) => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);

  // One sequence: the card rises, its lines settle, the seal is pressed on
  useSectionMotion(ref, (q) => {
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(q("[data-l-card]"), {
        y: 56,
        scale: 0.985,
        autoAlpha: 0,
        duration: 1.3,
        ease: "expo.out",
      })
      .from(
        q("[data-l-in]"),
        { y: 10, autoAlpha: 0, duration: 0.7, stagger: 0.07 },
        0.45
      )
      .from(
        q("[data-l-seal]"),
        { scale: 1.6, autoAlpha: 0, duration: 0.6, ease: "power2.in" },
        1.15
      )
      .from(q("[data-l-after]"), { autoAlpha: 0, duration: 0.8 }, 1.3);
  });

  return (
    <section
      ref={ref}
      className={`${s.velvet} relative flex flex-col items-center`}
      style={{
        minHeight: "100svh",
        padding: "5rem var(--gutter) 4rem",
        overflow: "hidden",
      }}
    >
      <div
        className={`${s.caps} absolute z-[3] right-[var(--gutter)]`}
        style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <LangSwitch setLang={setLang} />
      </div>

      <div className="relative w-full max-w-[26rem]">
        <div
          data-l-card=""
          className={`${s.paper} ${s.cardFrame} text-center px-7! pt-14! pb-16!`}
        >
          <p data-l-in="" className={s.smallCaps}>
            {t.invitedTo}
          </p>

          {guest && (
            <div data-l-in="" className="mt-5!">
              <p className={`${s.body} ${s.soft} italic text-[0.9rem]!`}>
                {t.dear}
              </p>
              <p className={`${s.lead} mt-0.5!`}>{guest}</p>
            </div>
          )}

          <h1
            data-l-in=""
            className={`${s.names} mt-4! whitespace-nowrap`}
            style={{ fontSize: "clamp(2.6rem, 12.5vw, 4.25rem)" }}
          >
            {couple.names}
          </h1>

          <DateLine />
          <p data-l-in="" className={`${s.body} ${s.tabular} mt-2!`}>
            {t.timeRange(formatTime(event.start), formatTime(event.end))}
          </p>

          <LaurelPair className="mx-auto! mt-6! opacity-80" width={56} />

          <p
            data-l-in=""
            className={`${s.caps} mt-3!`}
            style={{ color: "var(--c-rose)", fontWeight: 700, textWrap: "balance" }}
          >
            {event.venue}
          </p>
          <p
            data-l-in=""
            className={`${s.body} ${s.soft} mt-1!`}
            style={{ textWrap: "balance" }}
          >
            {event.address}
          </p>

          {cfg.mapImage && (
            <div data-l-in="">
              <MapFigure image={cfg.mapImage} />
            </div>
          )}

          <div data-l-in="" className="mt-6! grid gap-3">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={s.pill}
            >
              {t.map}
            </a>
          </div>
        </div>

        {/* the wax seal, pressed over the card's lower edge */}
        <div
          data-l-seal=""
          className="absolute left-1/2 -bottom-10 w-[5rem] -translate-x-1/2 z-[2]"
        >
          <HeartSeal className="w-full! h-auto!" />
        </div>
      </div>

      {cfg.turutMengundang.length > 0 && (
        <div data-l-after="" className="mt-24! text-center w-full">
          <FamilyList rule={false} />
        </div>
      )}
    </section>
  );
};

/**
 * /lamaran: the engagement invitation as a single card on velvet, no envelope
 * or scrolling show. Shares the guest allow list and the 404 with the other pages.
 */
const LamaranPage = ({ guest, ogImage, pageUrl, invalid }: InvitationProps) => {
  const [lang, setLang] = useState<Lang>("id");

  // Field colour behind overscroll / iOS rubber-banding, restored on leave
  useEffect(() => {
    const { body, documentElement: html } = document;
    const prev = [body.style.background, html.style.background];
    body.style.background = WINE;
    html.style.background = WINE;
    return () => {
      [body.style.background, html.style.background] = prev;
    };
  }, []);

  if (invalid) return <WeddingNotFound guest={guest} />;

  const title = guest
    ? `Undangan lamaran ${couple.names} untuk ${guest}`
    : `Undangan lamaran ${couple.names}`;
  const description = guest
    ? `Kepada Yth. ${guest}, Anda diundang ke lamaran ${couple.names}.`
    : `Undangan lamaran ${couple.names}.`;

  return (
    <ConfigProvider config={cfg}>
      <div className={`${s.root} ${fontVars}`} data-theme="wedding" lang={lang}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="theme-color" content={WINE} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="noindex" />
        </Head>

        <div className={s.grain} aria-hidden="true" />
        <LangProvider lang={lang} overrides={cfg.copy}>
          <main>
            <Content guest={guest} setLang={setLang} />
          </main>
        </LangProvider>
      </div>
    </ConfigProvider>
  );
};

export default LamaranPage;
