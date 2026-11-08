import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  allowedDevOrigins: ["ais-dev-xidnzlncu3ngb5imvdpf74-742607733953.us-west2.run.app"],
  images: {
    // Was `unoptimized: true`: every image (including the 2360px hero)
    // was served at full size to every viewport, with no srcset, so
    // mobile Lighthouse downloaded ~6x the pixels it displays.
    // The app runs on a Next.js server (Vercel / standalone output),
    // so the built-in optimizer can serve AVIF/WebP at the right width.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
