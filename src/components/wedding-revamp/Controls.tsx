import type { Lang } from "./i18n";
import { useLang } from "./i18n";
import s from "./wr.module.css";

/** ID / EN in Cinzel caps; the current one full strength */
export const LangSwitch = ({ setLang }: { setLang: (l: Lang) => void }) => {
  const { lang } = useLang();
  return (
    <div className="flex items-center" style={{ color: "var(--c-rose)" }}>
      {(["id", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="opacity-40" aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={l === "id" ? "Bahasa Indonesia" : "English"}
            lang={l}
            className={`${s.capsLink} px-2! text-[0.75rem]! ${lang === l ? "" : "opacity-45"}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
};

type Props = { playing: boolean; toggleMusic: () => void };

/** Floating music toggle once the pendant has scrolled away */
const Controls = ({ playing, toggleMusic }: Props) => {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={playing ? t.music.on : t.music.off}
      aria-pressed={playing}
      className="fixed z-40 right-[var(--gutter)] w-12! h-12! rounded-full flex items-center justify-center gap-[3px] cursor-pointer"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        background: "var(--c-wine)",
        color: "var(--c-paper)",
        boxShadow:
          "0 0 0 3px color-mix(in oklab, var(--c-paper) 70%, transparent), 0 8px 18px -6px rgba(40,5,10,0.6)",
      }}
    >
      {[0.9, 0.5, 0.75, 0.6].map((d, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={playing ? s.bar : s.barPaused}
          style={{ height: 14, animationDuration: `${d}s` }}
        />
      ))}
    </button>
  );
};

export default Controls;
