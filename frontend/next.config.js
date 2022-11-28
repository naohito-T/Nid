/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  productionBrowserSourceMaps: true,
  compiler: {
    styledComponents: true,
  },
  // scroll位置をBrowser history likeに復元する。
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/user',
        destination: '/',
        permanent: true, // 永続的なリダイレクトか（一時的なリダイレクトではないか）
      }
    ]
  }
};

module.exports = withInterceptStdout(nextConfig,  (text) => (text.includes('Duplicate atom key') ? '' : text));
