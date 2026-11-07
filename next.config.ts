import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el botón "N" de herramientas de desarrollo (solo aparece en local)
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "restauranteopulpino.es", pathname: "/wp-content/uploads/**" }],
  },
};

export default nextConfig;
