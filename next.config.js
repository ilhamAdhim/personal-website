const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public",
  disable:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "preview" ||
    process.env.NODE_ENV === "production",
  // delete two lines above to enable PWA in production deployment
  // add your own icons to public/manifest.json
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["miro.medium.com"],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
  },
  i18n,
  eslint: {
    dirs: ["src"],
  },
});
