/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/user',
        destination: '/',
        permanent: true, // 永続的なリダイレクトかのフラグ 永続的？
      }
    ]
  }
};

module.exports = nextConfig;
