/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
