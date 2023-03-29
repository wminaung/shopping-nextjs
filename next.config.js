/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com", "avatars.githubusercontent.com"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
