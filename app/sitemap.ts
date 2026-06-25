import type { MetadataRoute } from "next";

const BASE_URL = "https://splatoon.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/events", "/faq"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
