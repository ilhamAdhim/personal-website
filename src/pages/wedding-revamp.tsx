import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import Closing from "components/wedding-revamp/Closing";
import Controls from "components/wedding-revamp/Controls";
import Couple from "components/wedding-revamp/Couple";
import { WrDefs } from "components/wedding-revamp/Decor";
import Envelope from "components/wedding-revamp/Envelope";
import Events from "components/wedding-revamp/Events";
import { fontVars } from "components/wedding-revamp/fonts";
import Gallery from "components/wedding-revamp/Gallery";
import type { Lang } from "components/wedding-revamp/i18n";
import { LangProvider } from "components/wedding-revamp/i18n";
import {
  enableTilt,
  ScrollTrigger,
  useSmoothScroll,
} from "components/wedding-revamp/motion";
import Names from "components/wedding-revamp/Names";
import WeddingNotFound from "components/wedding-revamp/NotFound";
import Rsvp from "components/wedding-revamp/Rsvp";
import Story from "components/wedding-revamp/Story";
import Verse from "components/wedding-revamp/Verse";
import s from "components/wedding-revamp/wr.module.css";
import { WEDDING } from "data/weddingConfig";
import { isInvitedGuest } from "data/weddingGuests";

type Props = {
  /** ?to= named someone not on the list: show the themed not-found page */
  invalid?: boolean;
  guest: string;
  ogImage: string;
  pageUrl: string;
  /** ?open skips the envelope (return visits, screenshots) */
  opened: boolean;
};

const PAPER = "#fdf9ed"; // matches --c-paper

// Unknown names in ?to= get a 404 status and a themed not-found page
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
  res,
}) => {
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
  const qs = guest ? `?to=${encodeURIComponent(guest)}` : "";
  return {
    props: {
      guest,
      opened: query.open !== undefined,
      ogImage: `${origin}/api/og/wedding${qs}`,
      pageUrl: `${origin}/wedding-revamp${qs}`,
    },
  };
};

const Invitation = ({ guest, ogImage, pageUrl, opened }: Props) => {
  const [lang, setLang] = useState<Lang>("id");
  const [revealed, setRevealed] = useState(opened); // envelope started leaving
  const [envelopeGone, setEnvelopeGone] = useState(opened);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const lenis = useSmoothScroll();

  const coupleName = `${WEDDING.groom.short} & ${WEDDING.bride.short}`;

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
    ? `Undangan pernikahan ${coupleName} untuk ${guest}`
    : `Undangan pernikahan ${coupleName}`;
  const description = guest
    ? `Kepada Yth. ${guest}, Anda diundang ke pernikahan ${coupleName}.`
    : `Undangan pernikahan ${coupleName}.`;

  return (
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
      {WEDDING.music && (
        <audio ref={audio} src={WEDDING.music} loop preload="none" />
      )}

      <LangProvider lang={lang}>
        {!envelopeGone && (
          <Envelope
            guest={guest}
            onOpenStart={onOpenStart}
            onReveal={() => setRevealed(true)}
            onDone={onDone}
          />
        )}
        {revealed && WEDDING.music && (
          <Controls playing={playing} toggleMusic={toggleMusic} />
        )}

        <main aria-hidden={!revealed}>
          <Names
            revealed={revealed}
            setLang={setLang}
            playing={playing}
            toggleMusic={WEDDING.music ? toggleMusic : null}
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
  );
};

// Split in two so the invitation's scroll lock and motion never start for a 404
const WeddingRevamp = (props: Props) =>
  props.invalid ? (
    <WeddingNotFound guest={props.guest} />
  ) : (
    <Invitation {...props} />
  );

// Stands alone: no site header/footer
export default Object.assign(WeddingRevamp, {
  getLayout: (page: ReactNode) => page,
});
