/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.usercontent.google.com', 'drive.google.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',                 
        destination: 'http://10.0.132.142:25000/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
