import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type Lang = "id" | "en";

export const COPY = {
  id: {
    dear: "Kepada Yth. Bapak/Ibu/Saudara/i",
    defaultGuest: "Tamu Undangan",
    open: "Buka undangan",
    withLove: "Dengan cinta",
    weInvite: "Kami mengundang Anda",
    invitedTo: "Undangan Pernikahan",
    of: "",
    play: "Putar",
    units: {
      months: "Bulan",
      days: "Hari",
      hours: "Jam",
      minutes: "Menit",
      seconds: "Detik",
    },
    rsvpCta: "Konfirmasi kehadiran",
    verseSource: "QS. Ar-Rum : 21",
    verse:
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    coupleTitle: "Mempelai",
    coupleIntro:
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:",
    detailsTitle: "Detail Acara",
    detailsIntro:
      "Dengan penuh sukacita kami menantikan kehadiran Anda. Berikut semua yang perlu Anda ketahui tentang hari bahagia kami.",
    timelineTitle: "Susunan Acara",
    map: "Buka peta",
    calendar: "Simpan ke kalender",
    timeRange: (a: string, b: string) => `pukul ${a} sampai ${b} WIB`,
    storyTitle: "Kisah kami",
    galleryTitle: "Galeri",
    rsvpTitle: "Konfirmasi kehadiran",
    rsvpIntro: "Kabari kami apakah Anda bisa datang, dan titipkan doa untuk kami.",
    wishesTitle: "Doa dan ucapan",
    name: "Nama",
    attendance: "Kehadiran",
    attend: { yes: "Hadir", no: "Tidak hadir", maybe: "Masih ragu" },
    guests: "Jumlah orang",
    message: "Doa dan ucapan",
    messagePh: "Tuliskan doa untuk kedua mempelai…",
    send: "Kirim ucapan",
    sent: "Ucapan terkirim. Terima kasih.",
    wishesEmpty: "Belum ada ucapan. Tulis yang pertama.",
    summary: (y: number, n: number, m: number) =>
      `${y} hadir, ${n} berhalangan, ${m} masih ragu`,
    closingTitle: "Terima kasih",
    closingText:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    duaTranslation:
      "Semoga Allah memberkahimu, mencurahkan keberkahan atasmu, dan mengumpulkan kalian berdua dalam kebaikan.",
    duaSource: "HR. Abu Dawud",
    signed: "Kami yang berbahagia",
    alsoInviting: "Turut mengundang",
    music: { on: "Matikan musik", off: "Putar musik" },
  },
  en: {
    dear: "Dear",
    defaultGuest: "Honoured guest",
    open: "Open the invitation",
    withLove: "With love",
    weInvite: "We invite you",
    invitedTo: "You’re Invited To The Wedding",
    of: "of",
    play: "Play",
    units: {
      months: "Months",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    rsvpCta: "Reply to the invitation",
    verseSource: "Qur'an, Ar-Rum : 21",
    verse:
      "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
    coupleTitle: "The couple",
    coupleIntro:
      "Seeking the grace and blessing of Allah SWT, we joyfully invite you to the wedding of our children:",
    detailsTitle: "Wedding Details",
    detailsIntro:
      "We’re delighted to celebrate this special day with you. Here you’ll find everything you need to know, all in one place.",
    timelineTitle: "Our Timeline",
    map: "Open map",
    calendar: "Add to calendar",
    timeRange: (a: string, b: string) => `${a} to ${b} WIB`,
    storyTitle: "Our story",
    galleryTitle: "Gallery",
    rsvpTitle: "Will you come?",
    rsvpIntro: "Let us know if you can make it, and leave a prayer for us.",
    wishesTitle: "Prayers and wishes",
    name: "Name",
    attendance: "Attendance",
    attend: { yes: "Attending", no: "Can’t attend", maybe: "Not sure yet" },
    guests: "Number of people",
    message: "Prayers and wishes",
    messagePh: "Write a prayer for the couple…",
    send: "Send wishes",
    sent: "Wishes sent. Thank you.",
    wishesEmpty: "No wishes yet. Write the first one.",
    summary: (y: number, n: number, m: number) =>
      `${y} attending, ${n} can’t make it, ${m} not sure yet`,
    closingTitle: "Thank you",
    closingText:
      "It would be an honour and a joy for us to have you with us and receive your blessings.",
    duaTranslation:
      "May Allah bless you, shower His blessings upon you, and unite you both in goodness.",
    duaSource: "Abu Dawud",
    signed: "With love",
    alsoInviting: "Also inviting",
    music: { on: "Mute music", off: "Play music" },
  },
};

export type Copy = (typeof COPY)["id"];

const LangContext = createContext<{ lang: Lang; t: Copy }>({
  lang: "id",
  t: COPY.id,
});

/** A page can replace single strings, e.g. "Undangan Pernikahan" on the engagement page */
export type CopyOverrides = { id?: Partial<Copy>; en?: Partial<Copy> };

export const LangProvider = ({
  lang,
  overrides,
  children,
}: {
  lang: Lang;
  overrides?: CopyOverrides;
  children: ReactNode;
}) => (
  <LangContext.Provider
    value={{ lang, t: { ...(COPY[lang] as Copy), ...overrides?.[lang] } }}
  >
    {children}
  </LangContext.Provider>
);

export const useLang = () => useContext(LangContext);

export const formatDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));

export const formatTime = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  })
    .format(new Date(iso))
    .replace(".", ":");

export const dateParts = (iso: string, lang: Lang) => {
  const opts = { timeZone: "Asia/Jakarta" } as const;
  const locale = lang === "id" ? "id-ID" : "en-GB";
  const d = new Date(iso);
  return {
    weekday: new Intl.DateTimeFormat(locale, {
      ...opts,
      weekday: "long",
    }).format(d),
    day: new Intl.DateTimeFormat(locale, { ...opts, day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat(locale, { ...opts, month: "long" }).format(
      d
    ),
    year: new Intl.DateTimeFormat(locale, { ...opts, year: "numeric" }).format(
      d
    ),
  };
};
