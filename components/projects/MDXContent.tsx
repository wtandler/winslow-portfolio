"use client";

import { useMemo } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

interface MDXContentProps {
  source: string;
}

// Custom components for MDX
const components = {
  // Add custom components here as needed
  // e.g., custom code blocks, callouts, etc.
};

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );

  useEffect(() => {
    serialize(source).then(setMdxSource);
  }, [source]);

  if (!mdxSource) {
    return (
      <div style={{ color: "var(--text-muted)" }}>Loading content...</div>
    );
  }

  return <MDXRemote {...mdxSource} components={components} />;
}
