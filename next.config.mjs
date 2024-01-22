/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phils.design'
      },
      {
        protocol: 'https',
        hostname: 'gitlab.com'
      }
    ]    
  }
}

export default nextConfig;
