import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/mdx";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://winslowtandler.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  // Content routes report their frontmatter date; stamping every URL with
  // the build date teaches crawlers to ignore the field.
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  return [...staticRoutes, ...projectRoutes];
}
