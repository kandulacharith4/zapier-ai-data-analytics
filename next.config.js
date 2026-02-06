/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Allow larger file uploads
    },
  },

  // API configuration
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Increase limit for CSV uploads
    },
  },

  // Images optimization
  images: {
    unoptimized: true, // For static export compatibility
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Headers for CORS and security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    ZAPIER_WEBHOOK_URL: process.env.ZAPIER_WEBHOOK_URL || '',
  },

  // Webpack configuration for better handling of large files
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...config.optimization?.splitChunks?.cacheGroups,
          // Chunk for data processing utilities
          dataUtils: {
            test: /[\\/]node_modules[\\/](papaparse|csv-parser)[\\/]/,
            name: 'data-utils',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;
