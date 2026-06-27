import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

const siteUrl = "https://dinh-hieu-trong.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
