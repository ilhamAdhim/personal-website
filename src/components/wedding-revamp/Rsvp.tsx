import { useEffect, useMemo, useRef, useState } from "react";

import { useConfig } from "./config";
import { Sprig } from "./Decor";
import { useLang } from "./i18n";
import type { Lang } from "./i18n";
import {
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
  useIsoLayoutEffect,
} from "./motion";
import type { Attendance, Wish } from "./wishesStore";
import { createWishesStore } from "./wishesStore";
import s from "./wr.module.css";

/** A burgundy board with a torn cream sheet on it, the word set in spaced caps */
const RsvpCard = ({ title }: { title: string }) => (
  <div className="relative mx-auto w-[min(78vw,19rem)]! aspect-[5/4]">
    <div
      className={`${s.velvet} ${s.deckle} absolute inset-0`}
      style={{ boxShadow: "0 20px 36px -16px rgba(60,10,15,0.6)" }}
    />
    <div
      className={`${s.paper} ${s.deckle} absolute inset-[11%]`}
      style={{ boxShadow: "0 2px 6px rgba(40,5,10,0.35)" }}
    />
    <div className="absolute inset-[11%] flex flex-col items-center justify-center px-4!">
      <p
        className={s.caps}
        style={{ fontSize: "clamp(1.9rem, 1.5rem + 2vw, 2.6rem)", letterSpacing: "0.3em", color: "var(--c-rose)", marginRight: "-0.3em" }}
      >
        RSVP
      </p>
      <h2 className={`${s.body} mt-1! text-[0.85rem]!`} style={{ color: "var(--c-rose)" }}>
        {title}
      </h2>
    </div>
  </div>
);

const timeAgo = (iso: string, lang: Lang) => {
  const rtf = new Intl.RelativeTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
    numeric: "auto",
  });
  const mins = Math.round((new Date(iso).getTime() - Date.now()) / 60000);
  if (Math.abs(mins) < 60) return rtf.format(mins, "minute");
  const hrs = Math.round(mins / 60);
  if (Math.abs(hrs) < 24) return rtf.format(hrs, "hour");
  return rtf.format(Math.round(hrs / 24), "day");
};

const WishNote = ({ wish, fresh }: { wish: Wish; fresh: boolean }) => {
  const { t, lang } = useLang();
  const ref = useRef<HTMLLIElement>(null);

  // A wish you just sent slides into the top of the list
  useIsoLayoutEffect(() => {
    if (!fresh || !ref.current || prefersReducedMotion()) return undefined;
    const tween = gsap.from(ref.current, {
      y: -16,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    return () => {
      tween.revert();
    };
  }, [fresh]);

  return (
    <li ref={ref} className="pb-6! border-b border-[color-mix(in_oklab,var(--c-rose)_22%,transparent)]">
      <p className={`${s.script} text-[2rem]! leading-none!`}>{wish.name}</p>
      <p className={`${s.body} mt-2!`}>{wish.message}</p>
      <p className={`${s.caps} ${s.soft} mt-2! text-[0.68rem]!`}>
        {t.attend[wish.attendance]}, {timeAgo(wish.createdAt, lang)}
      </p>
    </li>
  );
};

const Rsvp = ({ guest }: { guest: string }) => {
  const { t } = useLang();
  const cfg = useConfig();
  const wishesStore = useMemo(
    () => createWishesStore(cfg.wishesKey),
    [cfg.wishesKey]
  );
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [freshId, setFreshId] = useState<string | null>(null);
  const [name, setName] = useState(guest);
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    wishesStore.list().then(setWishes);
  }, [wishesStore]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [wishes.length]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || sending) return;
    setSending(true);
    const wish = await wishesStore.add({
      name: name.trim(),
      attendance,
      guests: attendance === "no" ? 0 : guests,
      message: message.trim(),
    });
    setWishes((prev) => [wish, ...prev]);
    setFreshId(wish.id);
    setMessage("");
    setSending(false);
    setThanks(true);
    setTimeout(() => setThanks(false), 3500);
  };

  const count = (a: Attendance) =>
    wishes.filter((w) => w.attendance === a).length;

  return (
    <section id="rsvp" className={`${s.section} ${s.paper}`}>
      <div className="absolute -top-[1%] -left-[5%] w-[40vw]! max-w-[280px]! pointer-events-none">
        <Sprig seed={2} className="w-full! h-auto!" style={{ transform: "scaleY(-1)" }} />
      </div>
      <div className={s.wrapWide}>
        <RsvpCard title={t.rsvpTitle} />
        <p className={`${s.body} ${s.soft} mt-10! mx-auto! max-w-[28rem]!`}>
          {t.rsvpIntro}
        </p>

        <div className="mt-12! grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 md:gap-12 items-start">
          <form onSubmit={submit} className={`${s.formCard} space-y-7!`}>
            <label className="block">
              <span className={s.label}>{t.name}</span>
              <input
                className={s.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                required
                autoComplete="name"
              />
            </label>

            <fieldset>
              <legend className={s.label}>{t.attendance}</legend>
              <div className="grid gap-2">
                {(["yes", "no", "maybe"] as const).map((a) => (
                  <label key={a} className={s.option}>
                    <input
                      type="radio"
                      name="attendance"
                      value={a}
                      checked={attendance === a}
                      onChange={() => setAttendance(a)}
                    />
                    <span>{t.attend[a]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {attendance !== "no" && (
              <fieldset>
                <legend className={s.label}>{t.guests}</legend>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <label key={n} className={s.option}>
                      <input
                        type="radio"
                        name="guests"
                        checked={guests === n}
                        onChange={() => setGuests(n)}
                      />
                      <span className={`${s.tabular} justify-center`}>{n}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <label className="block">
              <span className={s.label}>{t.message}</span>
              <textarea
                className={s.input}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePh}
                maxLength={500}
                required
              />
            </label>

            <div>
              <button
                type="submit"
                className={s.pill}
                disabled={sending || !message.trim()}
              >
                {t.send}
              </button>
              <p aria-live="polite" className={`${s.body} mt-3! min-h-[1lh] text-center`}>
                {thanks ? t.sent : ""}
              </p>
            </div>
          </form>

          <div className="text-center md:text-left">
            <h3 className={`${s.script} text-[2.6rem]!`}>{t.wishesTitle}</h3>
            <p className={`${s.caps} ${s.soft} ${s.tabular} mt-1! text-[0.7rem]!`}>
              {t.summary(count("yes"), count("no"), count("maybe"))}
            </p>
            <div
              className="mt-8! max-h-[560px] overflow-y-auto pr-2!"
              data-lenis-prevent=""
            >
              {wishes.length === 0 ? (
                <p className={s.body}>{t.wishesEmpty}</p>
              ) : (
                <ul className="space-y-6! text-left">
                  {wishes.map((w) => (
                    <WishNote key={w.id} wish={w} fresh={w.id === freshId} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
