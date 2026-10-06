import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://the-wall-ab746.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/events",
    "/discover",
    "/market",
    "/opportunities",
    "/become-a-vendor",
    "/my-wall",
  ].map((path, index) => ({
    url: baseUrl + path,
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : Math.max(0.5, 0.9 - index * 0.05),
  }));
}
