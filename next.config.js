/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mexx-img-2019.s3.amazonaws.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://techshop-nine.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
