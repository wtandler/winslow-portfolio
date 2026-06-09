import { MDXRemote } from "next-mdx-remote/rsc";

interface MDXContentProps {
  source: string;
}

// Custom components for MDX (add as needed — e.g. callouts, custom code blocks)
const components = {};

// Server component: MDX is compiled on the server at build time (SSG), so the
// rendered content lands in the static HTML — good for SEO and link previews,
// with no client-side serialize round-trip or loading flash.
export function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote source={source} components={components} />;
}
