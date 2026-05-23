import type { NextConfig } from 'next';
// eslint-disable-next-line
const withMDX = require('@next/mdx')();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-railway-url.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
