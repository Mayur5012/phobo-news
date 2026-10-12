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
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/--+/g, ' ')
    .trim();

  // Keyword list to strip out to keep slugs short, dense, and punchy
  const stopWords = new Set([
    'for', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'from', 
    'by', 'with', 'major', 'deployment', 'verification', 'secures', 'outlines',
    'comprehensive', 'following', 'improbable', 'look', 'looks', 'currently', 'we', 'had',
    'is', 'are', 'was', 'were', 'will', 'be'
  ]);

  let words = cleanTitle.split(/\s+/).filter(word => !stopWords.has(word) && word.length > 0);

  // Geo-Optimization: Standardize continental & regional tokens
  const geoMap: Record<string, string> = {
    'pan-african': 'africa',
    'sub-saharan': 'africa',
    'nigerian': 'nigeria',
    'kenyan': 'kenya',
    'ghanaian': 'ghana',
    'british': 'uk',
    'american': 'us',
    'indian': 'india',
  };

  words = words.map(word => geoMap[word] || word);

  // Group high-value geo tags at the tail for clean regional index clustering
  const geoTags = ['africa', 'nigeria', 'kenya', 'ghana', 'india', 'uk', 'us'];
  const foundGeo = words.filter(w => geoTags.includes(w));
  if (foundGeo.length > 0) {
    words = words.filter(w => !geoTags.includes(w));
    words.push(foundGeo[0]);
  }

  // Force strict word limits and strip trailing/leading hyphens
  const slug = words.slice(0, 6).join('-').replace(/^-+|-+$/g, '');
  return slug || 'news-update';
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