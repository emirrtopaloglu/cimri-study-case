/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["cdn.cimri.io"]
  }
};

module.exports = nextConfig;
