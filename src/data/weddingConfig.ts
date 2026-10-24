// Everything a guest sees on /wedding-revamp lives here.
// Values wrapped in [brackets] are placeholders — replace them before sharing.

import type { CopyOverrides } from "components/wedding-revamp/i18n";

export type WeddingEvent = {
  key: string;
  title: { id: string; en: string };
  /** ISO string with the +07:00 offset (WIB) */
  start: string;
  end: string;
  venue: string;
  address: string;
  mapsUrl: string;
};

export type Person = {
  short: string;
  full: string;
  parents: { id: string; en: string };
  photo?: string;
  instagram?: string;
};

export const WEDDING = {
  /** localStorage key for this invitation's RSVPs and wishes */
  wishesKey: "wedding-revamp-wishes",

  groom: {
    short: "Ilham",
    full: "Muhammad Ilham Adhim",
    parents: {
      id: "Putra dari Bapak Winoto & Ibu Lia",
      en: "Son of Mr. Winoto & Mrs. Lia",
    },
    photo: "/images/wedding/groom.jpg",
    instagram: "ilhamadhim",
  } satisfies Person,

  bride: {
    short: "Firda",
    full: "Salsabila Firdausy",
    parents: {
      id: "Putri dari Bapak Agus & Ibu Nurul",
      en: "Daughter of Mr. Agus & Mrs. Nurul",
    },
    photo: "/images/wedding/bride.jpg",
  } satisfies Person,

  // TODO: real dates & venues
  events: [
    {
      key: "akad",
      title: { id: "Akad nikah", en: "Marriage ceremony" },
      start: "2026-12-19T08:00:00+07:00",
      end: "2026-12-19T10:00:00+07:00",
      venue: "[Nama Masjid]",
      address: "[Alamat lengkap, Kota]",
      mapsUrl: "https://maps.google.com/?q=Masjid",
    },
    {
      key: "resepsi",
      title: { id: "Resepsi", en: "Reception" },
      start: "2026-12-19T11:00:00+07:00",
      end: "2026-12-19T14:00:00+07:00",
      venue: "[Nama Gedung]",
      address: "[Alamat lengkap, Kota]",
      mapsUrl: "https://maps.google.com/?q=Gedung",
    },
  ] satisfies WeddingEvent[],

  // TODO: real times. Shown as "Susunan Acara" / "Our Timeline", in WIB.
  timeline: [
    { time: "08:00", title: { id: "Akad nikah", en: "Marriage ceremony" } },
    { time: "09:30", title: { id: "Foto keluarga", en: "Family photos" } },
    { time: "11:00", title: { id: "Resepsi", en: "Reception" } },
    { time: "12:00", title: { id: "Ramah tamah", en: "Lunch" } },
    { time: "14:00", title: { id: "Penutup", en: "Farewell" } },
  ],

  // TODO: your real story
  story: [
    {
      year: "2019",
      title: { id: "Pertama Bertemu", en: "First Meeting" },
      text: {
        id: "[Ceritakan bagaimana kalian pertama kali bertemu.]",
        en: "[Tell how you first met.]",
      },
    },
    {
      year: "2023",
      title: { id: "Saling Mengenal", en: "Getting to Know" },
      text: {
        id: "[Momen ketika kalian mulai dekat.]",
        en: "[The moment you grew close.]",
      },
    },
    {
      year: "2025",
      title: { id: "Lamaran", en: "The Proposal" },
      text: {
        id: "[Hari ketika dua keluarga bertemu.]",
        en: "[The day both families met.]",
      },
    },
    {
      year: "2026",
      title: { id: "Hari Bahagia", en: "The Day" },
      text: {
        id: "Bismillah, kami memulai perjalanan baru bersama.",
        en: "Bismillah, we begin a new journey together.",
      },
    },
  ],

  gallery: [
    "/images/wedding/prewed-1.jpg",
    "/images/wedding/prewed-2.jpg",
    "/images/wedding/prewed-3.jpg",
    "/images/wedding/prewed-4.jpg",
    "/images/wedding/prewed-5.jpg",
    "/images/wedding/prewed-6.jpg",
  ],

  /** Put an mp3 in /public/audio and set the path to enable the music toggle */
  music: null as string | null,

  turutMengundang: ["[Keluarga Besar Bapak ...]", "[Keluarga Besar Ibu ...]"],

  hashtag: "",
};

/** Everything one invitation page shows. WEDDING is the template; other events copy and override it. */
export type WeddingConfig = typeof WEDDING & {
  copy?: CopyOverrides;
  /** Show the bride on the left and the groom on the right in the couple section */
  brideFirst?: boolean;
  /** Drop the "Kami yang berbahagia" sign-off and the large names at the very end */
  hideSignature?: boolean;
};
