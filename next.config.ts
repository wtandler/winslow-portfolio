import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // /about was removed; the site is about the work, not the author
      { source: "/about", destination: "/", permanent: true },
      // Renamed when the prototype page was replaced by the launched product
      // (the old slug carried an internal acronym).
      {
        source: "/projects/css-agentic-intake",
        destination: "/projects/agentic-intake",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
