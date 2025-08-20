/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/greenappletravel-ae/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
