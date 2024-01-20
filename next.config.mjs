/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'phils.design'
      }
    ]    
  }
}

export default nextConfig;
