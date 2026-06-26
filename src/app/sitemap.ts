import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/data";

const siteUrl = "https://dinh-hieu-trong.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${siteUrl}/#projects`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/#contact`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ];
}
