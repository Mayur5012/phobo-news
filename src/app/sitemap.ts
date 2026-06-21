import { getNewsFeed, generateSlug } from "../lib/newsStore";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.zambotoday.com";

  const articles = getNewsFeed();

  // News Article URLs (Priority 0.8)
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${generateSlug(article.title)}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "never",
    priority: 0.8,
  }));

  // Categories (Priority 0.9)
  const categories = ["politics", "startups", "sports", "technology"];
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Static/Historical Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage (Priority 1.0)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    // Archives index (Priority 0.7)
    {
      url: `${baseUrl}/archives`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Historical high-authority archive (Priority 0.9)
    {
      url: `${baseUrl}/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];

  return [
    ...staticRoutes,
    ...categoryUrls,
    ...articleUrls,
  ];
}