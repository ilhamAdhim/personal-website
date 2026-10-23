import { Allura, Amiri, Cinzel, Lora } from "next/font/google";

// Allura for the script headings and names, Cinzel for the small caps lines
// ("WITH LOVE", dates, buttons), Lora for reading. Amiri for the Arabic.
export const script = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--wr-script",
  display: "swap",
});

export const caps = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--wr-caps",
  display: "swap",
});

export const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--wr-serif",
  display: "swap",
});

export const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--wr-arabic",
  display: "swap",
});

export const fontVars = `${script.variable} ${caps.variable} ${serif.variable} ${arabic.variable}`;
