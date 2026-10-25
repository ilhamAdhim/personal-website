// Everything a guest sees on /ilham-firda-engagement.
// It starts from the wedding config (same couple, photos, music, families) and
// overrides what differs. Values in [brackets] are placeholders to replace.

import type { WeddingConfig } from "./weddingConfig";
import { WEDDING } from "./weddingConfig";

export const ENGAGEMENT: WeddingConfig = {
  ...WEDDING,

  wishesKey: "engagement-wishes",

  // TODO: confirm the end time
  events: [
    {
      key: "lamaran",
      title: { id: "Lamaran", en: "Engagement" },
      start: "2026-11-21T10:00:00+07:00",
      end: "2026-11-21T13:00:00+07:00",
      venue: "Permata Jingga Swimming Pool & Cafe",
      address:
        "Permata Jingga Blok West Area, Jl. Raya Permata Jingga I, Tunggulwulung, Lowokwaru, Kota Malang, Jawa Timur 65149",
      mapsUrl: "https://maps.app.goo.gl/PDeTrMCncUMEu3Hh9",
    },
  ],

  // TODO: real running order
  timeline: [
    { time: "10:00", title: { id: "Kedatangan keluarga", en: "Families arrive" } },
    { time: "10:30", title: { id: "Penyampaian maksud", en: "Words of intent" } },
    { time: "11:00", title: { id: "Tukar cincin", en: "Ring exchange" } },
    { time: "11:30", title: { id: "Doa dan foto bersama", en: "Prayer and photos" } },
    { time: "12:00", title: { id: "Ramah tamah", en: "Lunch together" } },
  ],

  // TODO: your real story, ending at the engagement
  story: [
    WEDDING.story[0],
    WEDDING.story[1],
    {
      year: "2026",
      title: { id: "Hari Lamaran", en: "Engagement Day" },
      text: {
        id: "Dua keluarga bertemu, dan kami melangkah ke jenjang yang lebih serius.",
        en: "Two families meet, and we take the next step together.",
      },
    },
  ],

  hashtag: "",

  brideFirst: true,

  // Google Maps screenshot, the venue's pin is at 48.4% / 9.8% of the image
  mapImage: {
    src: "/images/lamaran/map.png",
    width: 1026,
    height: 767,
    pin: { x: 48.4, y: 9.8 },
    landmarks: [
      { name: "Taman Krida Budaya", x: 60.2, y: 49.9 },
      { name: "Politeknik Negeri Malang", x: 42.7, y: 65.2 },
      { name: "Universitas Brawijaya", x: 36.4, y: 85.8 },
    ],
  },
  hideSignature: true,

  turutMengundang: [
    "Keluarga Bapak Agus Setiabudi",
    "Keluarga Bapak Winoto",
  ],
  turutOneLine: true,

  // The sections say "wedding" in a few places; on this page they say engagement
  copy: {
    id: {
      coupleTitle: "", // no heading above the couple
      invitedTo: "Undangan Lamaran",
      coupleIntro:
        "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara lamaran putra-putri kami:",
      detailsTitle: "Detail Lamaran",
      detailsIntro:
        "Dengan penuh sukacita kami menantikan kehadiran Anda di hari lamaran kami. Berikut semua yang perlu Anda ketahui.",
    },
    en: {
      coupleTitle: "",
      invitedTo: "You’re Invited To The Engagement",
      coupleIntro:
        "Seeking the grace and blessing of Allah SWT, we joyfully invite you to the engagement of our children:",
      detailsTitle: "Engagement Details",
      detailsIntro:
        "We’re delighted to celebrate our engagement with you. Here’s everything you need to know.",
    },
  },
};
