import { getNewsFeed, generateSlug } from "../lib/newsStore";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.zambotoday.com";

  const articles = getNewsFeed();

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${generateSlug(article.title)}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "never" as const,
    priority: 0.8,
  }));

  const categories = ["politics", "startups", "sports", "others"];
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/archives`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      // www here must match canonical tag in the archive page.tsx
      url: `${baseUrl}/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html`,
      lastModified: new Date("2008-10-01"), // original publish date, not today
      changeFrequency: "yearly" as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...categoryUrls, ...articleUrls];
}