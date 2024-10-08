/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  // images: {
  //   domains: ["firebasestorage.googleapis.com"],
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
});
