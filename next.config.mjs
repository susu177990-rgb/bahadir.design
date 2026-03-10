import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
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
