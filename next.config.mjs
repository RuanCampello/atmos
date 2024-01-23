/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'gitlab.com'}
    ]    
  }
}

export default nextConfig;
