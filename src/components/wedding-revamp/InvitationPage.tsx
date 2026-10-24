import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";

import type { WeddingConfig } from "data/weddingConfig";
import { isInvitedGuest } from "data/weddingGuests";

import Closing from "./Closing";
import { ConfigProvider } from "./config";
import Controls from "./Controls";
import Couple from "./Couple";
import { WrDefs } from "./Decor";
import Envelope from "./Envelope";
import Events from "./Events";
import { fontVars } from "./fonts";
import Gallery from "./Gallery";
import type { Lang } from "./i18n";
import { LangProvider } from "./i18n";
import { enableTilt, ScrollTrigger, useSmoothScroll } from "./motion";
import Names from "./Names";
import WeddingNotFound from "./NotFound";
import Rsvp from "./Rsvp";
import Story from "./Story";
import Verse from "./Verse";
import s from "./wr.module.css";

export type InvitationProps = {
  /** ?to= named someone not on the list: show the themed not-found page */
  invalid?: boolean;
  guest: string;
  ogImage: string;
  pageUrl: string;
  /** ?open skips the envelope (return visits, screenshots) */
  opened: boolean;
};

const PAPER = "#fdf9ed"; // matches --c-paper

/**
 * Same for every invitation page: unknown names in ?to= get a 404 status and a
 * themed not-found page. `ogFor` picks which event the link-preview card shows.
 */
export const createGetServerSideProps =
  (path: string, ogFor?: string): GetServerSideProps<InvitationProps> =>
  async ({ query, req, res }) => {
    const guest = typeof query.to === "string" ? query.to.trim() : "";
    if (guest && !isInvitedGuest(guest)) {
      res.statusCode = 404;
      return {
        props: { invalid: true, guest, opened: true, ogImage: "", pageUrl: "" },
      };
    }

    const proto =
      (req.headers["x-forwarded-proto"] as string)?.split(",")[0] ?? "http";
    const origin = `${proto}://${req.headers.host}`;
    const og = new URLSearchParams();
    if (guest) og.set("to", guest);
    if (ogFor) og.set("for", ogFor);
    const page = guest ? `?to=${encodeURIComponent(guest)}` : "";
    return {
      props: {
        guest,
        opened: query.open !== undefined,
        ogImage: `${origin}/api/og/wedding${og.size ? `?${og}` : ""}`,
        pageUrl: `${origin}${path}${page}`,
      },
    };
  };

type Options = {
  config: WeddingConfig;
  /** Word used in the page title and link preview, e.g. "pernikahan" or "lamaran" */
  occasion: string;
};

/** The whole invitation: envelope, then the sections, all reading from `config` */
export const createInvitationPage = ({ config, occasion }: Options) => {
  const Invitation = ({ guest, ogImage, pageUrl, opened }: InvitationProps) => {
    const [lang, setLang] = useState<Lang>("id");
    const [revealed, setRevealed] = useState(opened); // envelope started leaving
    const [envelopeGone, setEnvelopeGone] = useState(opened);
    const [playing, setPlaying] = useState(false);
    const audio = useRef<HTMLAudioElement>(null);
    const lenis = useSmoothScroll();

    const coupleName = `${config.groom.short} & ${config.bride.short}`;

    // Field colour behind overscroll / iOS rubber-banding, restored on leave
    useEffect(() => {
      const { body, documentElement: html } = document;
      const prev = [
        body.style.background,
        html.style.background,
        body.style.overflowX,
        html.style.overflowX,
      ];
      body.style.background = PAPER;
      html.style.background = PAPER;
      body.style.overflowX = "clip";
      html.style.overflowX = "clip";
      return () => {
        [
          body.style.background,
          html.style.background,
          body.style.overflowX,
          html.style.overflowX,
        ] = prev;
      };
    }, []);

    // No scrolling while the envelope is closed
    useEffect(() => {
      const html = document.documentElement;
      if (!revealed) {
        window.scrollTo(0, 0);
        html.style.overflow = "hidden";
        lenis.current?.stop();
      } else {
        html.style.overflow = "";
        lenis.current?.start();
        ScrollTrigger.refresh();
      }
      return () => {
        html.style.overflow = "";
      };
    }, [revealed, lenis]);

    // Text length changes with language, so recompute trigger positions
    useEffect(() => {
      ScrollTrigger.refresh();
    }, [lang]);

    const onOpenStart = useCallback(() => {
      enableTilt();
      if (audio.current) {
        audio.current
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    }, []);

    const onDone = useCallback(() => {
      setRevealed(true);
      setEnvelopeGone(true);
    }, []);

    const toggleMusic = () => {
      const el = audio.current;
      if (!el) return;
      if (el.paused)
        el.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      else {
        el.pause();
        setPlaying(false);
      }
    };

    const title = guest
      ? `Undangan ${occasion} ${coupleName} untuk ${guest}`
      : `Undangan ${occasion} ${coupleName}`;
    const description = guest
      ? `Kepada Yth. ${guest}, Anda diundang ke ${occasion} ${coupleName}.`
      : `Undangan ${occasion} ${coupleName}.`;

    return (
      <ConfigProvider config={config}>
        <div
          className={`${s.root} ${fontVars}`}
          data-theme="wedding"
          lang={lang}
        >
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="theme-color" content={PAPER} />
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

          <WrDefs />
          <div className={s.grain} aria-hidden="true" />
          {config.music && (
            <audio ref={audio} src={config.music} loop preload="none" />
          )}

          <LangProvider lang={lang} overrides={config.copy}>
            {!envelopeGone && (
              <Envelope
                guest={guest}
                onOpenStart={onOpenStart}
                onReveal={() => setRevealed(true)}
                onDone={onDone}
              />
            )}
            {revealed && config.music && (
              <Controls playing={playing} toggleMusic={toggleMusic} />
            )}

            <main aria-hidden={!revealed}>
              <Names
                revealed={revealed}
                setLang={setLang}
                playing={playing}
                toggleMusic={config.music ? toggleMusic : null}
              />
              <Verse />
              <Couple />
              <Events />
              <Story />
              <Gallery />
              <Rsvp guest={guest} />
              <Closing />
            </main>
          </LangProvider>
        </div>
      </ConfigProvider>
    );
  };

  // Split in two so the invitation's scroll lock and motion never start for a 404
  const Page = (props: InvitationProps) =>
    props.invalid ? (
      <WeddingNotFound guest={props.guest} />
    ) : (
      <Invitation {...props} />
    );
  return Page;
};
