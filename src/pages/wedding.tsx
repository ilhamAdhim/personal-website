import { useColorMode } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

// --- Data ----------------------------------------------------------------------

const islamicQuotes = [
  {
    arabic: "\u0648\u064e\u0645\u0650\u0646\u0652 \u0622\u064a\u064e\u0627\u062a\u0650\u0647\u0650 \u0623\u064e\u0646\u0652 \u062e\u064e\u0644\u064e\u0642\u064e \u0644\u064e\u0643\u064f\u0645 \u0645\u0650\u0651\u0646\u0652 \u0623\u064e\u0646\u0641\u064f\u0633\u0650\u0643\u064f\u0645\u0652 \u0623\u064e\u0632\u0652\u0648\u064e\u0627\u062c\u064b\u0627 \u0644\u0650\u0651\u062a\u064e\u0633\u0652\u0643\u064f\u0646\u064f\u0648\u0627 \u0625\u0650\u0644\u064e\u064a\u0652\u0647\u064e\u0627 \u0648\u064e\u062c\u064e\u0639\u064e\u0644\u064e \u0628\u064e\u064a\u0652\u0646\u064e\u0643\u064f\u0645 \u0645\u064e\u0651\u0648\u064e\u062f\u064e\u0651\u0629\u064b \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064b",
    translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
    source: "Surah Ar-Rum",
    ref: "30:21",
  },
  {
    arabic: "\u0647\u064f\u0646\u064e\u0651 \u0644\u0650\u0628\u064e\u0627\u0633\u064c \u0644\u064e\u0651\u0643\u064f\u0645\u0652 \u0648\u064e\u0623\u064e\u0646\u062a\u064f\u0645\u0652 \u0644\u0650\u0628\u064e\u0627\u0633\u064c \u0644\u064e\u0651\u0647\u064f\u0646\u064e\u0651",
    translation: "They are clothing for you and you are clothing for them.",
    source: "Surah Al-Baqarah",
    ref: "2:187",
  },
  {
    arabic: "\u0631\u064e\u0628\u064e\u0651\u0646\u064e\u0627 \u0647\u064e\u0628\u0652 \u0644\u064e\u0646\u064e\u0627 \u0645\u0650\u0646\u0652 \u0623\u064e\u0632\u0652\u0648\u064e\u0627\u062c\u0650\u0646\u064e\u0627 \u0648\u064e\u0630\u064f\u0631\u0650\u0651\u064a\u064e\u0651\u0627\u062a\u0650\u0646\u064e\u0627 \u0642\u064f\u0631\u064e\u0651\u0629\u064e \u0623\u064e\u0639\u0652\u064a\u064f\u0646\u064d \u0648\u064e\u0627\u062c\u0652\u0639\u064e\u0644\u0652\u0646\u064e\u0627 \u0644\u0650\u0644\u0652\u0645\u064f\u062a\u064e\u0651\u0642\u0650\u064a\u0646\u064e \u0625\u0650\u0645\u064e\u0627\u0645\u064b\u0627",
    translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    source: "Surah Al-Furqan",
    ref: "25:74",
  },
];

const galleryImages = [
  { src: "/images/wedding/prewed-1.jpg", alt: "Prewed 1" },
  { src: "/images/wedding/prewed-2.jpg", alt: "Prewed 2" },
  { src: "/images/wedding/prewed-3.jpg", alt: "Prewed 3" },
  { src: "/images/wedding/prewed-4.jpg", alt: "Prewed 4" },
  { src: "/images/wedding/prewed-5.jpg", alt: "Prewed 5" },
  { src: "/images/wedding/prewed-6.jpg", alt: "Prewed 6" },
];

// --- Hooks ---------------------------------------------------------------------

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// --- Shared primitives ---------------------------------------------------------

const playfair = "'Playfair Display', Georgia, serif";

const Reveal = ({
  children, delay = 0, className = "", from = "bottom",
}: {
  children: React.ReactNode; delay?: number; className?: string; from?: "bottom" | "left" | "right";
}) => {
  const { ref, visible } = useFadeIn();
  const translate = from === "left" ? "-translate-x-8" : from === "right" ? "translate-x-8" : "translate-y-8";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translate}`} ${className}`}
    >
      {children}
    </div>
  );
};

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 my-2 ${className}`}>
    <div className="flex-1 h-px bg-linear-to-r from-transparent via-sky-200 to-transparent" />
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-sky-300 shrink-0">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
    <div className="flex-1 h-px bg-linear-to-r from-transparent via-sky-200 to-transparent" />
  </div>
);

const Chip = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center text-[11px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full border ${className}`}>
    {children}
  </span>
);

// --- Gallery card --------------------------------------------------------------

const GalleryCard = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const { ref, visible } = useFadeIn(0.1);
  const [err, setErr] = useState(false);
  const tall = index === 1 || index === 4;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms`, gridRow: tall ? "span 2" : "span 1" }}
      className={`group relative overflow-hidden rounded-2xl bg-slate-100 border border-sky-100
        transition-all duration-700 hover:shadow-2xl hover:shadow-sky-100/50 cursor-pointer
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      {err ? (
        <div className="w-full h-full min-h-50 flex flex-col items-center justify-center gap-3" style={{ background: "linear-gradient(135deg,#f0f9ff,#ecfeff)" }}>
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-sky-200"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
          <p className="text-xs text-sky-300 tracking-widest uppercase">Photo {index + 1}</p>
        </div>
      ) : (
        <>
          <img
            src={src} alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ minHeight: tall ? "420px" : "200px" }}
            onError={() => setErr(true)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-sky-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            {alt}
          </div>
        </>
      )}
    </div>
  );
};

// --- Page ----------------------------------------------------------------------

const WeddingPage: NextPage = () => {
  const { setColorMode } = useColorMode();

  // Force light mode on this page, restore on leave
  useEffect(() => {
    setColorMode("light");
    return () => setColorMode("dark");
  }, [setColorMode]);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#1e293b", fontFamily: "'Lexend', sans-serif" }}>
      <Head>
        <title>Ilham & Firda — Together Forever</title>
        <meta name="description" content="The wedding of Ilham & Firda — a celebration of love, faith, and togetherness." />
      </Head>

      {/* ===== HERO ===================================================== */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{ background: "linear-gradient(160deg,#ffffff 0%,#f0f9ff 50%,#ecfeff 100%)" }}
      >
        {/* Background geometric pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke="#0ea5e9" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="6" fill="none" stroke="#0ea5e9" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>

        {/* Blurred blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(186,230,253,0.5),transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(165,243,252,0.4),transparent 70%)" }} />

        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <Chip className="text-sky-500 border-sky-200 bg-sky-50 animate-[fadeIn_0.8s_ease_forwards]">
            Bismillahirrahmanirrahim
          </Chip>

          {/* Main names */}
          <h1
            className="text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tight"
            style={{ fontFamily: playfair, animation: "slideUp 1s ease 0.2s both" }}
          >
            <span style={{ background: "linear-gradient(135deg,#0ea5e9,#06b6d4,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ilham</span>
            <span style={{ color: "#94a3b8", fontSize: "0.7em", fontStyle: "italic" }}> & </span>
            <span style={{ background: "linear-gradient(135deg,#38bdf8,#0284c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Firda</span>
          </h1>

          {/* Ornamental line */}
          <div className="flex items-center justify-center gap-4" style={{ animation: "fadeIn 1s ease 0.6s both" }}>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right,transparent,#7dd3fc)" }} />
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-sky-300">
              <path d="M16 2L18.9 10.8H28.2L20.7 16.1L23.6 24.9L16 19.6L8.4 24.9L11.3 16.1L3.8 10.8H13.1Z" />
            </svg>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left,transparent,#7dd3fc)" }} />
          </div>

          <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto leading-relaxed" style={{ animation: "slideUp 0.9s ease 0.7s both" }}>
            Two souls, one journey — bound by love and blessed by faith.
          </p>
          <p className="text-sky-400 text-sm italic tracking-widest" style={{ animation: "fadeIn 1s ease 1s both" }}>
            &ldquo;Mawaddah wa Rahmah&rdquo;
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeIn 1s ease 1.5s both" }}>
          <span className="text-[10px] tracking-[0.25em] uppercase text-sky-300">Scroll</span>
          <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom,#7dd3fc,transparent)", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ===== ISLAMIC QUOTES ========================================== */}
      <section className="py-28 px-6" style={{ background: "linear-gradient(180deg,#f0f9ff,#ffffff)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-20">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">Words of Allah</Chip>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: playfair }}>
              Blessings on This<br />
              <span style={{ fontStyle: "italic", color: "#0ea5e9" }}>Sacred Bond</span>
            </h2>
          </Reveal>

          <div className="space-y-8">
            {islamicQuotes.map((q, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="relative rounded-3xl p-8 md:p-12 border border-sky-100 overflow-hidden group hover:border-sky-300 transition-all duration-500"
                  style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", boxShadow: "0 4px 40px rgba(14,165,233,0.06)" }}>

                  {/* Number */}
                  <div className="absolute top-6 right-8 text-[80px] font-bold leading-none select-none pointer-events-none"
                    style={{ color: "#e0f2fe", fontFamily: playfair }}>
                    0{i + 1}
                  </div>

                  {/* Arabic */}
                  <p
                    dir="rtl"
                    className="text-2xl md:text-3xl text-slate-700 leading-[2.2] text-right mb-8 relative z-10"
                    style={{ fontFamily: "'Amiri','Scheherazade New',serif", fontWeight: 400 }}
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
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">The Couple</Chip>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800" style={{ fontFamily: playfair }}>
              Ilham & Firda
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Groom */}
            <Reveal delay={80} from="left">
              <div className="group relative rounded-3xl overflow-hidden p-10 text-center cursor-default"
                style={{ background: "linear-gradient(145deg,#f0f9ff,#ffffff)", border: "1px solid #bae6fd", boxShadow: "0 8px 40px rgba(14,165,233,0.08)" }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2" style={{ background: "radial-gradient(circle,#7dd3fc,transparent)" }} />
                <div className="relative w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl"
                  style={{ background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)", boxShadow: "0 0 0 4px #bae6fd,0 8px 32px rgba(14,165,233,0.15)" }}>
                  🤵
                </div>
                <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">The Groom</Chip>
                <h3 className="text-2xl font-bold text-slate-800 mt-3" style={{ fontFamily: playfair }}>
                  Muhammad Ilham Adhim
                </h3>
                <p className="text-slate-400 text-sm mt-2">Son of Bapak & Ibu</p>
              </div>
            </Reveal>

            {/* Bride */}
            <Reveal delay={160} from="right">
              <div className="group relative rounded-3xl overflow-hidden p-10 text-center cursor-default"
                style={{ background: "linear-gradient(145deg,#ecfeff,#ffffff)", border: "1px solid #a5f3fc", boxShadow: "0 8px 40px rgba(6,182,212,0.08)" }}>
                <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-30 -translate-y-1/2 -translate-x-1/2" style={{ background: "radial-gradient(circle,#67e8f9,transparent)" }} />
                <div className="relative w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl"
                  style={{ background: "linear-gradient(135deg,#cffafe,#ecfeff)", boxShadow: "0 0 0 4px #a5f3fc,0 8px 32px rgba(6,182,212,0.15)" }}>
                  👰
                </div>
                <Chip className="text-cyan-500 border-cyan-200 bg-cyan-50 mb-4">The Bride</Chip>
                <h3 className="text-2xl font-bold text-slate-800 mt-3" style={{ fontFamily: playfair }}>
                  Firda
                </h3>
                <p className="text-slate-400 text-sm mt-2">Daughter of Bapak & Ibu</p>
              </div>
            </Reveal>
          </div>

          {/* Hadith banner */}
          <Reveal delay={240}>
            <div className="relative rounded-3xl px-10 py-12 text-center overflow-hidden text-white"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#06b6d4,#0284c7)", boxShadow: "0 20px 60px rgba(14,165,233,0.35)" }}>
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
              <p className="relative text-xl md:text-2xl font-light italic leading-relaxed text-white/90 mb-4" style={{ fontFamily: playfair }}>
                &ldquo;The best of you are those who are best to their wives.&rdquo;
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold">
                Prophet Muhammad ﷺ &middot; Tirmidhi
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== GALLERY ================================================= */}
      <section className="py-28 px-6" style={{ background: "linear-gradient(180deg,#ffffff,#f0f9ff)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-4">Prewed Gallery</Chip>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: playfair }}>
              Our Moments<br />
              <span style={{ fontStyle: "italic", color: "#0ea5e9" }}>Together</span>
            </h2>
            <p className="text-slate-400 max-w-xs mx-auto leading-relaxed text-sm">
              A glimpse of our story, captured in light and love.
            </p>
          </Reveal>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
            {galleryImages.map((img, i) => (
              <GalleryCard key={i} src={img.src} alt={img.alt} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING DUA ============================================= */}
      <section className="relative py-28 px-6 overflow-hidden text-center bg-white">
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-sky-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-sky-100 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full border border-sky-200 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <Chip className="text-sky-500 border-sky-200 bg-sky-50 mb-8">A Prayer for the Couple</Chip>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8" style={{ fontFamily: playfair }}>
              Barakallahu Lakuma
            </h2>

            <p
              className="text-3xl md:text-4xl text-slate-700 leading-loose mb-8 font-light"
              dir="rtl"
              style={{ fontFamily: "'Amiri',serif" }}
            >
              بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>

            <Divider className="mb-8" />

            <p className="text-slate-500 italic text-lg md:text-xl leading-relaxed mb-4" style={{ fontFamily: playfair }}>
              &ldquo;May Allah bless you both, bless upon you, and join you together in goodness.&rdquo;
            </p>
            <span className="text-xs text-sky-400 font-semibold tracking-[0.2em] uppercase">
              Dua for the newlyweds &middot; Abu Dawud
            </span>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  );
};

export default WeddingPage;

