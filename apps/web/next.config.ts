import type { NextConfig } from 'next';

// Destination for the API proxy rewrite. Defaults to the Render service.
const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? 'https://youwetech.onrender.com';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
