/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [{ pathname: "/**" }],
    qualities: [75, 80, 85, 95],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/projects", destination: "/#works", permanent: false },
    ];
  },
};

export default nextConfig;
