import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OGP画像 (/r/[id]/opengraph-image) が実行時に読むフォントとキャラ画像を、
  // Vercel のサーバーレス関数のバンドルに含める。
  outputFileTracingIncludes: {
    "/r/[id]/opengraph-image": ["./lib/fonts/**", "./public/images/**"],
  },
};

export default nextConfig;
