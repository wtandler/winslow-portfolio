import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/mdx";
import { getAllWriting } from "@/lib/writing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://winslowtandler.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/writing", "/contact"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  // Content routes report their frontmatter date; stamping every URL with
  // the build date teaches crawlers to ignore the field.
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
  }));

  const writingRoutes = getAllWriting().map((piece) => ({
    url: `${siteUrl}/writing/${piece.slug}`,
    lastModified: new Date(piece.frontmatter.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
