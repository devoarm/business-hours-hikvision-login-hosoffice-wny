/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr", "th"],
  },
};

module.exports = nextConfig;
