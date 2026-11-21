/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep the RSS parser out of the client bundle; it only runs on the server.
  serverExternalPackages: ['rss-parser'],
};

export default nextConfig;
