import type { NextConfig } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

function getOrigin(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

const connectSources = [
  "'self'",
  getOrigin(supabaseUrl),
  'https://api.stripe.com',
  'https://checkout.stripe.com',
  'https://*.api.sanity.io',
  'https://*.apicdn.sanity.io',
  process.env.NODE_ENV === 'production' ? null : 'ws:',
  process.env.NODE_ENV === 'production' ? null : 'wss:',
].filter(Boolean) as string[];

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  'https://js.stripe.com',
  process.env.NODE_ENV === 'production' ? null : "'unsafe-eval'",
].filter(Boolean) as string[];

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src ${scriptSources.join(' ')}`,
  `script-src-elem ${scriptSources.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.supabase.co",
  `connect-src ${connectSources.join(' ')}`,
  "font-src 'self' data:",
  "frame-src 'self' https://checkout.stripe.com https://js.stripe.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  process.env.NODE_ENV === 'production' ? 'upgrade-insecure-requests' : null,
]
  .filter(Boolean)
  .join('; ');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID:
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
      process.env.SANITY_PROJECT_ID ??
      '',
    NEXT_PUBLIC_SANITY_DATASET:
      process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? '',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value:
              process.env.NODE_ENV === 'production'
                ? 'max-age=31536000; includeSubDomains; preload'
                : 'max-age=0',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
