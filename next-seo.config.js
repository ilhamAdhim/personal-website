/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Web Portfolio",
  titleTemplate: "Ilham Adhim | %s",
  defaultTitle: "Ilham Adhim",
  openGraph: {
    images: [
      {
        url: "https://ilhamadhim.vercel.app/public/next-app-chakra-ts.png",
        width: 1920,
        height: 1080,
        alt: "Ilham Adhim Personal Web Page",
      },
    ],
  },
};

export default defaultSEOConfig;
