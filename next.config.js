/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  output: "export",
  images: {
    domains: ["cdn.cimri.io"]
  }
};

module.exports = nextConfig;
