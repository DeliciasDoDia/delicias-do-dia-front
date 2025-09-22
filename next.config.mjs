/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.usercontent.google.com', 'drive.google.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',                 // qualquer rota que comece com /api
        destination: 'http://10.0.2.162:25000/api/:path*', // backend privado
      },
    ];
  },
};

export default nextConfig;
