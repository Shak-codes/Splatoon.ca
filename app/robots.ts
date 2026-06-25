import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://splatoon.ca/sitemap.xml",
    host: "https://splatoon.ca",
  };
}
