import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 65 is used for the hero logo (a flat graphic that compresses well); 75 is
    // Next's default for everything else. Both must be whitelisted in Next 15.
    qualities: [65, 75],
  },
};

export default nextConfig;
