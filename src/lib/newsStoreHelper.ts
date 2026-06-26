// src/lib/newsStoreHelper.ts
import { getNewsFeed, Article } from "./newsStore";

/**
 * Normalizes the UI/URL category name to match data.json schema.
 * - 'politics' maps to 'politics' and 'Politics'
 * - 'others' maps to 'other'
 */
export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getNewsFeed();
  const lowerCat = category.toLowerCase();
  
  if (lowerCat === "others" || lowerCat === "other") {
    return allArticles.filter((art) => art.category === "other");
  }
  
  return allArticles.filter((art) => art.category.toLowerCase() === lowerCat);
}

/**
 * Returns all articles sorted by date (newest first).
 */
export function getSortedArticles(): Article[] {
  const allArticles = getNewsFeed();
  return [...allArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Pads a list of articles to a target count using other available articles.
 * Prevents duplicates from appearing in the returned array.
 */
export function getPaddedArticlesByCategory(category: string, targetCount: number = 12): Article[] {
  const categoryArticles = getArticlesByCategory(category);
  const sortedCategoryArticles = [...categoryArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  if (sortedCategoryArticles.length >= targetCount) {
    return sortedCategoryArticles.slice(0, targetCount);
  }
  
  // Pad the array if it has fewer than targetCount
  const allSorted = getSortedArticles();
  const categoryTitles = new Set(sortedCategoryArticles.map((art) => art.title));
  const paddedList = [...sortedCategoryArticles];
  
  for (const art of allSorted) {
    if (paddedList.length >= targetCount) break;
    if (!categoryTitles.has(art.title)) {
      paddedList.push(art);
      categoryTitles.add(art.title);
    }
  }
  
  return paddedList;
}

/**
 * Returns the most read articles.
 * Initially uses the default dataset order but handles sorting or layout compatibility.
 */
export function getMostReadArticles(limit: number = 10): Article[] {
  const allArticles = getNewsFeed();
  // Simply slice the top items, maintaining the default tracking interface compatibility
  return allArticles.slice(0, limit);
}
