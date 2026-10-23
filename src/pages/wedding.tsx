import { useColorMode } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import WeddingLayout from "layout/WeddingLayout";
import WeddingNotFound from "components/wedding-revamp/NotFound";
import { Button } from "components/ui/button";
import Input from "components/ui/input";
import Textarea from "components/ui/textarea";
import {
  Arch,
  Corner,
  HairlineDivider,
  Orbits,
  Rosette,
} from "components/wedding/Hairline";
import { isInvitedGuest } from "data/weddingGuests";

// three.js is heavy and browser-only, so it loads after hydration
const HeroParticles = dynamic(
  () => import("components/wedding/HeroParticles"),
  {
    ssr: false,
  }
);

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Types --------------------------------------------------------------------

interface Comment {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  color: string;
  isNew?: boolean;
}

// --- Data ----------------------------------------------------------------------

const islamicQuotes = [
  {
    arabic:
      "\u0648\u064e\u0645\u0650\u0646\u0652 \u0622\u064a\u064e\u0627\u062a\u0650\u0647\u0650 \u0623\u064e\u0646\u0652 \u062e\u064e\u0644\u064e\u0642\u064e \u0644\u064e\u0643\u064f\u0645 \u0645\u0650\u0651\u0646\u0652 \u0623\u064e\u0646\u0641\u064f\u0633\u0650\u0643\u064f\u0645\u0652 \u0623\u064e\u0632\u0652\u0648\u064e\u0627\u062c\u064b\u0627 \u0644\u0650\u0651\u062a\u064e\u0633\u0652\u0643\u064f\u0646\u064f\u0648\u0627 \u0625\u0650\u0644\u064e\u064a\u0652\u0647\u064e\u0627 \u0648\u064e\u062c\u064e\u0639\u064e\u0644\u064e \u0628\u064e\u064a\u0652\u0646\u064e\u0643\u064f\u0645 \u0645\u064e\u0651\u0648\u064e\u062f\u064e\u0651\u0629\u064b \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064b",
    translation:
      "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
    source: "Surah Ar-Rum",
    ref: "30:21",
  },
  {
    arabic:
      "\u0647\u064f\u0646\u064e\u0651 \u0644\u0650\u0628\u064e\u0627\u0633\u064c \u0644\u064e\u0651\u0643\u064f\u0645\u0652 \u0648\u064e\u0623\u064e\u0646\u062a\u064f\u0645\u0652 \u0644\u0650\u0628\u064e\u0627\u0633\u064c \u0644\u064e\u0651\u0647\u064f\u0646\u064e\u0651",
    translation: "They are clothing for you and you are clothing for them.",
    source: "Surah Al-Baqarah",
    ref: "2:187",
  },
  {
    arabic:
      "\u0631\u064e\u0628\u064e\u0651\u0646\u064e\u0627 \u0647\u064e\u0628\u0652 \u0644\u064e\u0646\u064e\u0627 \u0645\u0650\u0646\u0652 \u0623\u064e\u0632\u0652\u0648\u064e\u0627\u062c\u0650\u0646\u064e\u0627 \u0648\u064e\u0630\u064f\u0631\u0650\u0651\u064a\u064e\u0651\u0627\u062a\u0650\u0646\u064e\u0627 \u0642\u064f\u0631\u064e\u0651\u0629\u064e \u0623\u064e\u0639\u0652\u064a\u064f\u0646\u064d \u0648\u064e\u0627\u062c\u0652\u0639\u064e\u0644\u0652\u0646\u064e\u0627 \u0644\u0650\u0644\u0652\u0645\u064f\u062a\u064e\u0651\u0642\u0650\u064a\u0646\u064e \u0625\u0650\u0645\u064e\u0627\u0645\u064b\u0627",
    translation:
      "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    source: "Surah Al-Furqan",
    ref: "25:74",
  },
];

const SEED_COMMENTS: Comment[] = [
  {
    id: "seed-1",
    name: "Aisyah Ramadhani",
    avatar: "AR",
    time: "2 hours ago",
    message:
      "MasyaAllah, barakallahu fiikuma! May your marriage be filled with endless love, laughter, and blessings. So happy for you both! 🫦",
    color: "from-sky-400 to-cyan-400",
  },
  {
    id: "seed-2",
    name: "Rizky Firmansyah",
    avatar: "RF",
    time: "5 hours ago",
    message:
      "Selamat menempuh hidup baru, Ilham & Firda! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Aamiin ya Rabb 🌿",
    color: "from-cyan-400 to-teal-400",
  },
  {
    id: "seed-3",
    name: "Nur Fadhilah",
    avatar: "NF",
    time: "Yesterday",
    message:
      "Wishing you both a lifetime of joy and togetherness. You two are absolutely perfect for each other. Congratulations! 💙",
    color: "from-blue-400 to-sky-400",
  },
  {
    id: "seed-4",
    name: "Dimas Prasetyo",
    avatar: "DP",
    time: "Yesterday",
    message:
      "Alhamdulillah, akhirnya sah! Selamat ya Mas Ilham, semoga rumah tangganya langgeng dan penuh keberkahan. Sehat-sehat terus kalian berdua!",
    color: "from-sky-500 to-blue-400",
  },
  {
    id: "seed-5",
    name: "Siti Maulida",
    avatar: "SM",
    time: "2 days ago",
    message:
      "Such a beautiful couple inside and out. May Allah SWT grant you a home full of peace, love, and righteous children. Barakallahu lakuma 🌸",
    color: "from-teal-400 to-cyan-500",
  },
];

const AVATAR_COLORS = [
  "from-sky-400 to-cyan-400",
  "from-cyan-500 to-blue-400",
  "from-blue-400 to-sky-500",
  "from-teal-400 to-cyan-500",
  "from-sky-500 to-teal-400",
];

const LS_KEY = "wedding-wishes";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? "s" : ""} ago`;
}

const galleryImages = [
  { src: "/images/wedding/prewed-1.jpg", alt: "Prewed 1" },
  { src: "/images/wedding/prewed-2.jpg", alt: "Prewed 2" },
  { src: "/images/wedding/prewed-3.jpg", alt: "Prewed 3" },
  { src: "/images/wedding/prewed-4.jpg", alt: "Prewed 4" },
  { src: "/images/wedding/prewed-5.jpg", alt: "Prewed 5" },
  { src: "/images/wedding/prewed-6.jpg", alt: "Prewed 6" },
];

// --- Motion --------------------------------------------------------------------

/** Tween hairline strokes (pathLength=1) from hidden to fully drawn */
const drawIn = (targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) =>
  gsap.fromTo(
    targets,
    { strokeDasharray: "1 1", strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", ...vars }
  );

/**
 * All page choreography in one place. Elements opt in through data attributes:
 *  data-reveal="up|left|right" (+ data-delay ms)  fade/slide in on scroll
 *  data-draw-group                                draw child [data-draw] strokes on scroll
 *  data-arabic                                    right-to-left clip reveal
 *  data-parallax="<px>"                           scrubbed vertical drift
 *  data-float                                     gentle idle bob
 *  data-shine                                     light sweep across a banner
 *  data-gallery-card                              curtain reveal + image parallax
 *  data-orbit="1|-1"                              scroll-scrubbed rotation
 */
function useWeddingMotion(scope: React.RefObject<HTMLElement>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return undefined;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        // Hero is hidden in the SSR markup to avoid a flash before the intro
        gsap.set(q("[data-hero-hide]"), { autoAlpha: 1 });
        if ((ctx.conditions as { reduce: boolean }).reduce) return;

        // ---- Hero intro ------------------------------------------------------
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .add(
            drawIn(q("[data-hero-rosette] [data-draw]"), {
              duration: 2.6,
              stagger: 0.04,
            }),
            0
          )
          .add(
            drawIn(q("[data-hero-corner] [data-draw]"), {
              duration: 1.6,
              stagger: 0.1,
            }),
            0.3
          )
          .from(
            q("[data-hero-card]"),
            { y: 40, autoAlpha: 0, scale: 0.97, duration: 1.1 },
            0.1
          )
          .from(
            q("[data-hero-chip]"),
            { y: 16, autoAlpha: 0, duration: 0.8 },
            0.4
          )
          .from(
            q("[data-hero-word]"),
            {
              yPercent: 115,
              rotate: 3,
              duration: 1.4,
              stagger: 0.18,
              ease: "expo.out",
            },
            0.55
          )
          .from(
            q("[data-hero-amp]"),
            {
              scale: 0.3,
              rotate: -40,
              autoAlpha: 0,
              duration: 1.1,
              ease: "back.out(2)",
            },
            0.85
          )
          .add(
            drawIn(q("[data-hero-rule] [data-draw]"), { duration: 1.2 }),
            1.1
          )
          .from(
            q("[data-hero-fade]"),
            { y: 20, autoAlpha: 0, duration: 1, stagger: 0.15 },
            1.2
          );

        // Idle motion in the hero
        gsap.to(q("[data-hero-rosette]"), {
          rotate: 360,
          duration: 160,
          repeat: -1,
          ease: "none",
        });
        q("[data-blob]").forEach((el, i) =>
          gsap.to(el, {
            x: i ? -40 : 40,
            y: i ? -30 : 30,
            duration: 9 + i * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        );
        gsap.fromTo(
          q("[data-scroll-line]"),
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1.4,
            repeat: -1,
            ease: "power2.inOut",
            yoyo: true,
          }
        );

        // Hero drifts away as you scroll past it
        const heroScrub = {
          trigger: q("[data-hero]")[0],
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(q("[data-hero-content]"), {
          yPercent: -18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: heroScrub,
        });
        gsap.to(q("[data-hero-rosette-wrap]"), {
          scale: 1.35,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: heroScrub,
        });

        // ---- Generic scroll reveals -----------------------------------------
        q("[data-reveal]").forEach((el) => {
          const dir = el.dataset.reveal;
          gsap.from(el, {
            x: dir === "left" ? -60 : dir === "right" ? 60 : 0,
            y: dir === "left" || dir === "right" ? 0 : 50,
            autoAlpha: 0,
            duration: 1.1,
            delay: Number(el.dataset.delay ?? 0) / 1000,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        q("[data-draw-group]").forEach((svg) => {
          drawIn(svg.querySelectorAll("[data-draw]"), {
            stagger: 0.06,
            scrollTrigger: { trigger: svg, start: "top 85%", once: true },
          });
        });

        q("[data-arabic]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 0% 100%)", autoAlpha: 0.3 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              autoAlpha: 1,
              duration: 1.8,
              ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }
          );
        });

        q("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: -Number(el.dataset.parallax) },
            {
              y: Number(el.dataset.parallax),
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        q("[data-float]").forEach((el, i) =>
          gsap.to(el, {
            y: -8,
            duration: 2.4 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        );

        q("[data-shine]").forEach((el) =>
          gsap.fromTo(
            el,
            { xPercent: 0 },
            {
              xPercent: 420,
              duration: 2.2,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 3.5,
            }
          )
        );

        // ---- Gallery ---------------------------------------------------------
        q("[data-gallery-card]").forEach((card, i) => {
          const img = card.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
            delay: (i % 3) * 0.12,
          });
          tl.fromTo(
            card,
            { clipPath: "inset(100% 0% 0% 0% round 16px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              duration: 1.3,
              ease: "expo.inOut",
            }
          );
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.45 },
              { scale: 1.15, duration: 1.6, ease: "expo.out" },
              0.2
            );
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });

        // ---- Closing orbits --------------------------------------------------
        q("[data-orbit]").forEach((g) => {
          gsap.to(g, {
            rotate: 220 * Number(g.dataset.orbit),
            svgOrigin: "300 300",
            ease: "none",
            scrollTrigger: {
              trigger: g.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    );

    return () => mm.revert();
  }, []);
}

// --- Shared primitives ---------------------------------------------------------

const playfair = "'Playfair Display', Georgia, serif";

const Reveal = ({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
}) => (
  <div data-reveal={from} data-delay={delay} className={className}>
    {children}
  </div>
);

const Divider = ({ className = "" }: { className?: string }) => (
  <HairlineDivider className={`text-sky-300 my-2 ${className}`} />
);

const Chip = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center text-[11px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full border ${className}`}
  >
    {children}
  </span>
);

// --- Gallery card --------------------------------------------------------------

const GalleryCard = ({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) => {
  const [err, setErr] = useState(false);
  const tall = index === 1 || index === 4;
  return (
    <div
      data-gallery-card=""
      style={{ gridRow: tall ? "span 2" : "span 1" }}
      className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-sky-100
        transition-shadow duration-700 hover:shadow-2xl hover:shadow-sky-100/50 cursor-pointer"
    >
      {err ? (
        <div
          className="w-full h-full min-h-50 flex flex-col items-center justify-center gap-3"
          style={{ background: "linear-gradient(135deg,#f0f9ff,#ecfeff)" }}
        >
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-sky-200">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
          <p className="text-xs text-sky-300 tracking-widest uppercase">
            Photo {index + 1}
          </p>
        </div>
      ) : (
        <>
          {/* Hover zoom lives on the wrapper; GSAP owns the img transform */}
          <div className="absolute inset-0 transition-transform duration-1200 ease-out group-hover:scale-105">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.15)" }}
              onError={() => setErr(true)}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-sky-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            {alt}
          </div>
        </>
      )}
    </div>
  );
};

// --- Comment card -------------------------------------------------------------

const CommentCard = ({ c, isNew = false }: { c: Comment; isNew?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      if (isNew) {
        // Freshly sent wish: drop in, then the avatar pops
        gsap
          .timeline()
          .from(el, {
            y: -28,
            scale: 0.96,
            autoAlpha: 0,
            duration: 0.7,
            ease: "back.out(1.6)",
          })
          .from(
            "[data-avatar]",
            { scale: 0, rotate: -90, duration: 0.6, ease: "back.out(2.5)" },
            0.2
          );
      } else {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [isNew]);

  return (
    <div
      ref={ref}
      className={`flex gap-4 rounded-2xl bg-white border p-5 transition-[border-color,box-shadow] duration-500 hover:border-sky-200 hover:shadow-md hover:shadow-sky-50
        ${isNew ? "border-sky-200" : "border-sky-50"}`}
      style={{
        boxShadow: isNew
          ? "0 4px 24px rgba(14,165,233,0.1)"
          : "0 2px 16px rgba(14,165,233,0.04)",
      }}
    >
      <div
        data-avatar=""
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold bg-linear-to-br ${c.color}`}
      >
        {c.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-sm font-semibold text-slate-700">
            {c.name}
            {isNew && (
              <span className="ml-2 text-[10px] bg-sky-100 text-sky-500 px-2 py-0.5 rounded-full font-semibold tracking-wide">
                You
              </span>
            )}
          </span>
          <span className="text-xs text-slate-400 shrink-0">{c.time}</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{c.message}</p>
        <button
          type="button"
          className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors"
        >
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          Amiin
        </button>
      </div>
    </div>
  );
};

// --- Page ----------------------------------------------------------------------

// Unknown guest names in ?to= get a 404 status and a themed not-found page
export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const { to } = query;
  if (typeof to === "string" && to.trim() && !isInvitedGuest(to)) {
    res.statusCode = 404;
    return { props: { invalid: true, guest: to.trim() } };
  }
  return { props: {} };
};

type WeddingPageType = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const WeddingInvitation = () => {
  const { setColorMode } = useColorMode();
  const router = useRouter();
  const guestName =
    typeof router.query.to === "string"
      ? decodeURIComponent(router.query.to).trim()
      : "";

  // Force light mode on this page, restore on leave
  useEffect(() => {
    setColorMode("light");
    return () => setColorMode("dark");
  }, [setColorMode]);

  const rootRef = useRef<HTMLDivElement>(null);
  useWeddingMotion(rootRef);

  // --- Comments state ----------------------------------------------------------
  const [comments, setComments] = useState<Comment[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Load saved + seed on mount
  useEffect(() => {
    const saved: Comment[] = JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
    setComments([
      ...saved.map((c) => ({ ...c, time: timeAgo(c.time) })),
      ...SEED_COMMENTS,
    ]);
  }, []);

  // Comments change the page height, so scroll trigger positions need updating
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [comments.length]);

  const handleSend = () => {
    const trimName = name.trim();
    const trimMsg = message.trim();
    if (!trimMsg) return;

    setSending(true);
    const displayName = trimName || "Anonymous";
    const initials = getInitials(displayName);
    const colorIdx = Math.floor(Math.random() * AVATAR_COLORS.length);

    const entry: Comment = {
      id: crypto.randomUUID(),
      name: displayName,
      avatar: initials,
      message: trimMsg,
      time: "Just now",
      color: AVATAR_COLORS[colorIdx],
      isNew: true,
    };

    // Persist to localStorage
    const saved: Comment[] = JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
    localStorage.setItem(
      LS_KEY,
      JSON.stringify([{ ...entry, time: new Date().toISOString() }, ...saved])
    );

    setComments((prev) => [entry, ...prev]);
    setNewIds((prev) => new Set([...prev, entry.id]));
    setName("");
    setMessage("");

    setTimeout(() => setSending(false), 400);
  };

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Head>
        <title>
          {guestName
            ? `${guestName} — You're Invited | Ilham & Firda`
            : "Ilham & Firda — Together Forever"}
        </title>
        <meta
          name="description"
          content="The wedding of Ilham & Firda — a celebration of love, faith, and togetherness."
        />
        <noscript>
          <style>{`[data-hero-hide]{visibility:visible!important}`}</style>
        </noscript>
      </Head>

      {/* ===== HERO ===================================================== */}
      <section
        data-hero=""
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center"
        style={{
          background:
            "linear-gradient(160deg,#ffffff 0%,#f0f9ff 50%,#ecfeff 100%)",
        }}
      >
        {/* Background geometric pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="geo"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,5 75,22 75,58 40,75 5,58 5,22"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="0.8"
              />
              <circle
                cx="40"
                cy="40"
                r="6"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>

        {/* Blurred blobs */}
        <div
          data-blob=""
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(186,230,253,0.5),transparent 70%)",
          }}
        />
        <div
          data-blob=""
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(165,243,252,0.4),transparent 70%)",
          }}
        />

        {/* Drifting light motes (three.js) */}
        <HeroParticles />

        {/* Hairline rosette behind the names */}
        <div
          data-hero-hide=""
          data-hero-rosette-wrap=""
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ visibility: "hidden" }}
        >
          <div
            data-hero-rosette=""
            className="w-[min(92vw,720px)] aspect-square text-sky-300/70"
          >
            <Rosette className="w-full h-full" />
          </div>
        </div>

        {/* Hairline corner flourishes */}
        <div
          data-hero-hide=""
          className="absolute inset-0 pointer-events-none text-sky-300"
          style={{ visibility: "hidden" }}
        >
          {(
            [
              ["top-24 left-4 md:left-8", ""],
              ["top-24 right-4 md:right-8", "x"],
              ["bottom-6 left-4 md:left-8", "y"],
              ["bottom-6 right-4 md:right-8", "xy"],
            ] as const
          ).map(([pos, flip]) => (
            <div
              key={pos}
              data-hero-corner=""
              className={`absolute w-14 h-14 md:w-24 md:h-24 ${pos}`}
            >
              <Corner flip={flip} className="w-full h-full" />
            </div>
          ))}
        </div>

        <div
          data-hero-hide=""
          data-hero-content=""
          className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto w-full"
          style={{ visibility: "hidden" }}
        >
          {/* ── Invitation address card ── shown only when ?to= present */}
          {guestName && (
            <div
              data-hero-card=""
              className="w-full max-w-lg rounded-3xl border border-sky-200/60 text-center overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 8px 48px rgba(14,165,233,0.15), 0 1px 0 rgba(255,255,255,0.9) inset",
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg,#38bdf8,#06b6d4,#0ea5e9)",
                }}
              />

              <div className="px-10 py-8">
                {/* Seal icon */}
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#e0f2fe,#cffafe)",
                    border: "1px solid #bae6fd",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-sky-400">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>

                <p className="text-[10px] tracking-[0.35em] uppercase text-sky-400 font-bold mb-3">
                  Personal Invitation
                </p>

                <p className="text-slate-400 text-sm mb-2">
                  We joyfully invite
                </p>

                <p
                  className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-3"
                  style={{ fontFamily: playfair }}
                >
                  {guestName}
                </p>

                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-12 bg-sky-200" />
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3 h-3 fill-sky-300 shrink-0"
                  >
                    <path d="M8 0L9.8 5.8H16L10.9 9.4L12.7 15.2L8 11.6L3.3 15.2L5.1 9.4L0 5.8H6.2Z" />
                  </svg>
                  <div className="h-px w-12 bg-sky-200" />
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">
                  to witness and celebrate the blessed union of
                </p>
                <p
                  className="text-sky-500 text-sm font-semibold mt-1"
                  style={{ fontFamily: playfair }}
                >
                  Ilham & Firda
                </p>
              </div>
            </div>
          )}

          <div data-hero-chip="">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50">
              Bismillahirrahmanirrahim
            </Chip>
          </div>

          {/* Main names: each word rises out of its own mask */}
          <h1
            className="text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tight"
            style={{ fontFamily: playfair }}
          >
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
              <span
                data-hero-word=""
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg,#0ea5e9,#06b6d4,#38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ilham
              </span>
            </span>
            <span
              data-hero-amp=""
              className="inline-block mx-[0.2em]"
              style={{
                color: "#94a3b8",
                fontSize: "0.7em",
                fontStyle: "italic",
              }}
            >
              &amp;
            </span>
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
              <span
                data-hero-word=""
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg,#38bdf8,#0284c7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Firda
              </span>
            </span>
          </h1>

          {/* Ornamental hairline */}
          <div data-hero-rule="" className="w-56 text-sky-300">
            <HairlineDivider drawOnScroll={false} />
          </div>

          <p
            data-hero-fade=""
            className="text-slate-500 text-lg md:text-xl max-w-md mx-auto leading-relaxed"
          >
            Two souls, one journey — bound by love and blessed by faith.
          </p>
          <p
            data-hero-fade=""
            className="text-sky-400 text-sm italic tracking-widest"
          >
            &ldquo;Mawaddah wa Rahmah&rdquo;
          </p>
        </div>

        {/* Scroll cue */}
        <div
          data-hero-hide=""
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ visibility: "hidden" }}
        >
          <span
            data-hero-fade=""
            className="text-[10px] tracking-[0.25em] uppercase text-sky-300"
          >
            Scroll
          </span>
          <div
            data-scroll-line=""
            className="w-px h-10 rounded-full"
            style={{
              background: "linear-gradient(to bottom,#7dd3fc,transparent)",
            }}
          />
        </div>
      </section>

      {/* ===== ISLAMIC QUOTES ========================================== */}
      <section
        className="py-28 px-6"
        style={{ background: "linear-gradient(180deg,#f0f9ff,#ffffff)" }}
      >
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-20">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">
              Words of Allah
            </Chip>
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: playfair }}
            >
              Blessings on This
              <br />
              <span style={{ fontStyle: "italic", color: "#0ea5e9" }}>
                Sacred Bond
              </span>
            </h2>
          </Reveal>

          <div className="space-y-8">
            {islamicQuotes.map((q, i) => (
              <Reveal key={q.ref} delay={i * 120}>
                <div
                  className="relative rounded-3xl p-8 md:p-12 border border-sky-100 overflow-hidden group hover:border-sky-300 transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 40px rgba(14,165,233,0.06)",
                  }}
                >
                  {/* Number */}
                  <div
                    data-parallax="24"
                    className="absolute top-6 right-8 text-[80px] font-bold leading-none select-none pointer-events-none"
                    style={{ color: "#e0f2fe", fontFamily: playfair }}
                  >
                    0{i + 1}
                  </div>

                  {/* Arabic */}
                  <p
                    dir="rtl"
                    data-arabic=""
                    className="text-2xl md:text-3xl text-slate-700 leading-[2.2] text-right mb-8 relative z-10"
                    style={{
                      fontFamily: "'Amiri','Scheherazade New',serif",
                      fontWeight: 400,
                    }}
                  >
                    {q.arabic}
                  </p>

                  <Divider />

                  <p className="text-slate-500 text-center text-base md:text-lg italic leading-relaxed mt-6 mb-5">
                    &ldquo;{q.translation}&rdquo;
                  </p>

                  <div className="flex justify-center">
                    <span className="text-xs tracking-widest uppercase text-sky-400 font-bold">
                      {q.source} &middot; {q.ref}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COUPLE =================================================== */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">
              The Couple
            </Chip>
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-800"
              style={{ fontFamily: playfair }}
            >
              Ilham & Firda
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Groom */}
            <Reveal delay={80} from="left">
              <div
                className="group relative rounded-3xl overflow-hidden p-10 text-center cursor-default"
                style={{
                  background: "linear-gradient(145deg,#f0f9ff,#ffffff)",
                  border: "1px solid #bae6fd",
                  boxShadow: "0 8px 40px rgba(14,165,233,0.08)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2"
                  style={{
                    background: "radial-gradient(circle,#7dd3fc,transparent)",
                  }}
                />
                <div className="relative w-40 h-52 mx-auto mb-4 flex items-end justify-center pb-6">
                  <Arch className="absolute inset-0 w-full h-full text-sky-300" />
                  <div
                    data-float=""
                    className="relative w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                    style={{
                      background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)",
                      boxShadow:
                        "0 0 0 4px #bae6fd,0 8px 32px rgba(14,165,233,0.15)",
                    }}
                  >
                    🤵
                  </div>
                </div>
                <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">
                  The Groom
                </Chip>
                <h3
                  className="text-2xl font-bold text-slate-800 mt-3"
                  style={{ fontFamily: playfair }}
                >
                  Muhammad Ilham Adhim
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Son of Bapak & Ibu
                </p>
              </div>
            </Reveal>

            {/* Bride */}
            <Reveal delay={160} from="right">
              <div
                className="group relative rounded-3xl overflow-hidden p-10 text-center cursor-default"
                style={{
                  background: "linear-gradient(145deg,#ecfeff,#ffffff)",
                  border: "1px solid #a5f3fc",
                  boxShadow: "0 8px 40px rgba(6,182,212,0.08)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-30 -translate-y-1/2 -translate-x-1/2"
                  style={{
                    background: "radial-gradient(circle,#67e8f9,transparent)",
                  }}
                />
                <div className="relative w-40 h-52 mx-auto mb-4 flex items-end justify-center pb-6">
                  <Arch className="absolute inset-0 w-full h-full text-cyan-300" />
                  <div
                    data-float=""
                    className="relative w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                    style={{
                      background: "linear-gradient(135deg,#cffafe,#ecfeff)",
                      boxShadow:
                        "0 0 0 4px #a5f3fc,0 8px 32px rgba(6,182,212,0.15)",
                    }}
                  >
                    👰
                  </div>
                </div>
                <Chip className="text-cyan-500 border-cyan-200 bg-cyan-50 mb-4">
                  The Bride
                </Chip>
                <h3
                  className="text-2xl font-bold text-slate-800 mt-3"
                  style={{ fontFamily: playfair }}
                >
                  Firda
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Daughter of Bapak & Ibu
                </p>
              </div>
            </Reveal>
          </div>

          {/* Hadith banner */}
          <Reveal delay={240}>
            <div
              className="relative rounded-3xl px-10 py-12 text-center overflow-hidden text-white"
              style={{
                background: "linear-gradient(135deg,#0ea5e9,#06b6d4,#0284c7)",
                boxShadow: "0 20px 60px rgba(14,165,233,0.35)",
              }}
            >
              <div
                data-shine=""
                className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg,transparent,rgba(255,255,255,0.28),transparent)",
                }}
              />
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
              <p
                className="relative text-xl md:text-2xl font-light italic leading-relaxed text-white/90 mb-4"
                style={{ fontFamily: playfair }}
              >
                &ldquo;The best of you are those who are best to their
                wives.&rdquo;
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold">
                Prophet Muhammad ﷺ &middot; Tirmidhi
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== GALLERY ================================================= */}
      <section
        className="py-28 px-6"
        style={{ background: "linear-gradient(180deg,#ffffff,#f0f9ff)" }}
      >
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">
              Prewed Gallery
            </Chip>
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: playfair }}
            >
              Our Moments
              <br />
              <span style={{ fontStyle: "italic", color: "#0ea5e9" }}>
                Together
              </span>
            </h2>
            <p className="text-slate-400 py-4 mx-auto leading-relaxed text-sm text-center">
              A glimpse of our story, captured in light and love.
            </p>
          </Reveal>

          {/* Masonry-style grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            style={{ gridAutoRows: "200px" }}
          >
            {galleryImages.map((img, i) => (
              <GalleryCard
                key={img.src}
                src={img.src}
                alt={img.alt}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING DUA ============================================= */}
      <section className="relative py-28 px-6 overflow-hidden text-center bg-white">
        {/* Hairline orbit rings, rotating with scroll */}
        <Orbits className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 max-w-none text-sky-200 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-8">
              A Prayer for the Couple
            </Chip>

            <h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-8"
              style={{ fontFamily: playfair }}
            >
              Barakallahu Lakuma
            </h2>

            <p
              className="text-3xl md:text-4xl text-slate-700 leading-loose mb-8 font-light"
              dir="rtl"
              data-arabic=""
              style={{ fontFamily: "'Amiri',serif" }}
            >
              بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا
              فِي خَيْرٍ
            </p>

            <Divider className="mb-8" />

            <p
              className="text-slate-500 italic text-lg md:text-xl leading-relaxed mb-4"
              style={{ fontFamily: playfair }}
            >
              &ldquo;May Allah bless you both, bless upon you, and join you
              together in goodness.&rdquo;
            </p>
            <span className="text-xs text-sky-400 font-semibold tracking-[0.2em] uppercase">
              Dua for the newlyweds &middot; Abu Dawud
            </span>
          </Reveal>
        </div>
      </section>

      {/* ===== COMMENTS ================================================ */}
      <section
        className="py-20 px-6"
        style={{ background: "linear-gradient(180deg,#f0f9ff,#ffffff)" }}
      >
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">
              Well Wishes
            </Chip>
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-800"
              style={{ fontFamily: playfair }}
            >
              Blessings from Loved Ones
            </h2>
          </Reveal>

          {/* Comment form */}
          <Reveal delay={80} className="mb-10">
            <div
              className="rounded-3xl border border-sky-100 bg-white overflow-hidden"
              style={{ boxShadow: "0 8px 40px rgba(14,165,233,0.08)" }}
            >
              {/* Header strip */}
              <div
                className="px-8 py-5 border-b border-sky-50"
                style={{
                  background: "linear-gradient(135deg,#f0f9ff,#ecfeff)",
                }}
              >
                <p className="text-sm font-bold text-slate-600 tracking-wide">
                  Leave a message ✦
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Your kind words mean the world to them
                </p>
              </div>

              {/* Form body */}
              <div className="px-8 py-8 space-y-6">
                <div>
                  <label
                    htmlFor="guest-name"
                    className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Your name
                  </label>
                  <Input
                    id="guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aisyah Ramadhani"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guest-message"
                    className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Your message
                  </label>
                  <Textarea
                    id="guest-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send your blessings to Ilham & Firda..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                        handleSend();
                    }}
                  />
                </div>
              </div>

              {/* Footer strip */}
              <div className="px-8 py-5 border-t border-sky-50 flex items-center justify-between gap-4">
                <span className="text-[11px] text-slate-300 select-none">
                  Ctrl + Enter to send
                </span>
                <Button
                  type="button"
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  size="lg"
                >
                  {sending ? (
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  ) : (
                    "Send Wishes ✦"
                  )}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Comments list */}
          <div className="space-y-5">
            {comments.map((c) => (
              <CommentCard key={c.id} c={c} isNew={newIds.has(c.id)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Split in two so the invitation's motion and color-mode changes never run on a 404
const WeddingPage: WeddingPageType = ({
  invalid,
  guest,
}: {
  invalid?: boolean;
  guest?: string;
}) => (invalid ? <WeddingNotFound guest={guest ?? ""} /> : <WeddingInvitation />);

export default Object.assign(WeddingPage, {
  getLayout: (page: ReactNode) => <WeddingLayout>{page}</WeddingLayout>,
});
