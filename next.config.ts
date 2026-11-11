import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nvr-design-language",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;