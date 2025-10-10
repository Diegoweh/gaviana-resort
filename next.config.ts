import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Usa 'domains' si son pocos dominios conocidos
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "tu-cdn.com",          // 👈 cambia por el tuyo
      "gavianna.com.mx",     // 👈 ejemplo
    ],
  },
};

export default nextConfig;
