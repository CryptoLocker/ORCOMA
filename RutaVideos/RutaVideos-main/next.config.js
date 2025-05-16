/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["picsum.photos", "storage.googleapis.com"],
    unoptimized: true,
  },
  // Configuración para el puerto 3000
  devIndicators: {
    buildActivity: true,
  },
  // Eliminar cualquier configuración específica de Vercel
  output: "standalone", // Permite despliegue en cualquier servidor
}

module.exports = nextConfig
