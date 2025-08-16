import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@/app/not-found.tsx'] = path.resolve(
      './app/pages/not-found/not-found.tsx'
    );
    return config;
  },
};

export default nextConfig;
