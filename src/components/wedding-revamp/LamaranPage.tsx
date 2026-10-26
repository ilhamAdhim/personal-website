import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { ENGAGEMENT } from "data/engagementConfig";

import { FamilyList } from "./Closing";
import { ConfigProvider, coupleOf } from "./config";
import { LangSwitch } from "./Controls";
import { HeartSeal, InvitedTo, LaurelPair } from "./Decor";
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
  print,
}: {
  guest: string;
  setLang: (l: Lang) => void;
  print: boolean;
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
        {!print && <LangSwitch setLang={setLang} />}
      </div>

      {/* A5 portrait, one column. The print page goes landscape with two columns from md up */}
      <div
        className={`relative w-full max-w-[26rem] ${print ? "md:max-w-[60rem] md:my-auto" : ""}`}
      >
        <div
          data-l-card=""
          className={`${s.paper} ${s.cardFrame} text-center px-7! pt-14! pb-16! aspect-[148/210] ${
            print
              ? "md:px-14! md:pt-12! md:pb-12! md:aspect-[210/148] md:grid md:grid-cols-2 md:items-center md:content-center md:gap-x-14"
              : ""
          }`}
        >
          <div>
          <div data-l-in="">
            <InvitedTo text={t.invitedTo} />
          </div>

          {(guest || print) && (
            <div data-l-in="" className="mt-5!">
              <p className={`${s.body} ${s.soft} italic text-[0.9rem]!`}>
                {t.dear}
              </p>
              {print ? (
                // left empty: the recipient is written in by hand
                <div
                  className="mx-auto! mt-2! h-9 w-4/5"
                  style={{
                    borderBottom:
                      "1px solid color-mix(in oklab, var(--c-rose) 45%, transparent)",
                  }}
                />
              ) : (
                <p className={`${s.lead} mt-0.5!`}>{guest}</p>
              )}
            </div>
          )}

          {print && (
            <p
              data-l-in=""
              className={`${s.body} mt-5!`}
              style={{ fontSize: "0.95rem", textWrap: "balance" }}
            >
              {lang === "id"
                ? "Dengan ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara lamaran putra dan putri kami"
                : "We kindly invite you to join the engagement of our son and daughter"}
            </p>
          )}

          <h1
            data-l-in=""
            className={`${s.names} mt-4! whitespace-nowrap ${print ? "md:text-[3.5rem]!" : ""}`}
            style={{ fontSize: "clamp(2.6rem, 12.5vw, 4.25rem)" }}
          >
            {couple.names}
          </h1>

          <DateLine />
          <p data-l-in="" className={`${s.body} ${s.tabular} mt-2!`}>
            {t.timeRange(formatTime(event.start), formatTime(event.end))}
          </p>

          <LaurelPair className={`mx-auto! mt-6! opacity-80 ${print ? "md:hidden!" : ""}`} width={56} />
          </div>

          {/* print: right column on md+, a hairline divides the two */}
          <div
            className={print ? "flex flex-col md:border-l md:pl-14" : ""}
            style={{ borderColor: "color-mix(in oklab, var(--c-rose) 35%, transparent)" }}
          >
          {/* print: the map comes first, then the venue and address under it */}
          <div className={print ? "order-2 mt-4!" : ""}>
          <p
            data-l-in=""
            className={`${s.caps} mt-3! ${print ? "mt-0!" : ""}`}
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
          </div>

          {cfg.mapImage && (
            <div data-l-in="" className={print ? "order-1" : ""}>
              <MapFigure image={cfg.mapImage} print={print} />
            </div>
          )}

          {!print && (
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
          )}

          </div>

          {/* print: spans both columns so the families fit on a single line */}
          {print && cfg.turutMengundang.length > 0 && (
            <div data-l-in="" className="mt-7! md:col-span-2 md:mt-8!">
              <h3 className={s.caps}>{t.alsoInviting}</h3>
              <p
                className={`${s.body} mt-2! whitespace-nowrap md:text-[1.05rem]!`}
                style={{ fontSize: "clamp(0.7rem, 2.9vw, 1.05rem)", letterSpacing: 0 }}
              >
                {cfg.turutMengundang.join(" & ")}
              </p>
            </div>
          )}
        </div>

        {/* the wax seal, pressed over the card's lower edge */}
        <div
          data-l-seal=""
          className="absolute left-1/2 -bottom-10 w-[5rem] -translate-x-1/2 z-[2]"
        >
          <HeartSeal className="w-full! h-auto!" />
        </div>
      </div>

      {!print && cfg.turutMengundang.length > 0 && (
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
const LamaranPage = ({
  guest,
  ogImage,
  pageUrl,
  invalid,
  print = false,
}: InvitationProps & {
  /** printable variant: fixed salutation, blank recipient, no map button */
  print?: boolean;
}) => {
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
            <Content guest={guest} setLang={setLang} print={print} />
          </main>
        </LangProvider>
      </div>
    </ConfigProvider>
  );
};

export default LamaranPage;
