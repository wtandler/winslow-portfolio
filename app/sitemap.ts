import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/mdx";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://winslowtandler.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
