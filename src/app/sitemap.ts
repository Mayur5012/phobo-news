import { getNewsFeed, generateSlug } from '../lib/newsStore';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getNewsFeed();
  const baseUrl = 'https://www.yourdomain.com'; // Replace with your actual live domain

  // Map your JSON articles to Google's required sitemap format
  const articleUrls = articles.map((art) => ({
    url: `${baseUrl}/news/${generateSlug(art.title)}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: 'never' as const,
    priority: 0.8,
  }));

  // Add your homepage and categories
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'always' as const, priority: 1.0 },
    { url: `${baseUrl}/?cat=startups`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  return [...staticRoutes, ...articleUrls];
}