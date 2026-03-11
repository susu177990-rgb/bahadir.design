/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 85],
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
