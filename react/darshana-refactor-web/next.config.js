/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeDetection: false,
  },

  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'cdn.whiz.pe',
      'lh3.googleusercontent.com',
      'app.darshana.io',
      'darshana-refactor.whiz.pe',
    ],
  },
};

module.exports = nextConfig;
