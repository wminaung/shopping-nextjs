/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "avatars.githubusercontent.com",
      "qcmtezfilrwudtfsxrtg.supabase.co",
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
