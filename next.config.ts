import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['services.baxus.co'], // Your image domains
  },
  // Other configurations you need
};

export default config;