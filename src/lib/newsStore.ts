// src/lib/newsStore.ts
import localStaticData from "../app/data.json";

export interface Article {
  title: string;
  content: string;
  image_url: string;
  category: 'startups' | 'politics' | 'sports' | 'other';
  link: string; 
  publishedAt: string;
}

/**
 * Advanced SEO & Geo-Targeted Slug Optimizer
 * Drops structural stop-words and weights location identifiers at the URL tail
 */
export const generateSlug = (title: string): string => {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();

  // Keyword list to strip out to keep slugs short, dense, and punchy
  const stopWords = new Set([
    'for', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'from', 
    'by', 'with', 'major', 'deployment', 'verification', 'secures', 'outlines',
    'comprehensive', 'following', 'improbable', 'look', 'looks', 'currently', 'we', 'had'
  ]);

  let words = cleanTitle.split(/\s+/).filter(word => !stopWords.has(word));

  // Geo-Optimization: Standardize continent variations into top-tier geo tokens
  words = words.map(word => {
    if (word === 'pan-african' || word === 'sub-saharan') return 'africa';
    return word;
  });

  // Ensure high-value country/continent modifiers group at the end for index consistency
  if (words.includes('africa')) {
    words = words.filter(w => w !== 'africa');
    words.push('africa');
  }

  // Force strict word limits for optimal click-through visibility on Search result cards
  return words.slice(0, 6).join('-');
};

export function getNewsFeed(category: string = ''): Article[] {
  const castedStaticData = localStaticData as Article[];
  if (!category || category === 'all') return castedStaticData;
  return castedStaticData.filter(art => art.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  const castedStaticData = localStaticData as Article[];
  return castedStaticData.find(art => generateSlug(art.title) === slug);
}