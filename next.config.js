/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [],
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Fix Chrome compatibility issue with React 19 + Next.js 15
  webpack: (config, { dev, isServer }) => {
    // Ensure proper module resolution for Chrome
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Fix module loading issues in development
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              name: false,
              chunks: 'all',
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      };
    }
    
    return config;
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Security headers for performance
  async headers() {
    return [
      {
        // Apply security headers to pages only, not static assets
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets (images, fonts, etc.)
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache video files with shorter cache time due to size
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;