/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/projects", destination: "/#works", permanent: false },
    ];
  },
};

export default nextConfig;
