/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: true, // enabling this will enable SSR for Tailwind
      },
    reactStrictMode: false,
    images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '8000',
              pathname: '/avatars/**', // This allows all images from /uploads path
          },
      ],
  },
};

export default nextConfig;
