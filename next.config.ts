import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import type { Pluggable } from "unified";

const withMDX = createMDX({
  /* config options here */
  // extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm"], ["remark-html"]] as Pluggable[],
    rehypePlugins: [["rehype-highlight"], ["rehype-stringify"]] as Pluggable[],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    viewTransition: true,
    mdxRs: true,
  },
  redirects: async () => [
    {
      source: "/blog/brag-documents",
      destination: "/blog/how-to-use-a-brag-document",
      permanent: true,
    },
    {
      source: "/blog/prop-constructor-pattern",
      destination: "/blog/default-override-pattern",
      permanent: true,
    },
  ],
};

export default withMDX(nextConfig);
