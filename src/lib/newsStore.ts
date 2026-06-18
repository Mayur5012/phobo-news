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

// Helper utility to turn a headline title into a safe lookup key slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-');        
};

export function getNewsFeed(category: string = ''): Article[] {
  const castedStaticData = localStaticData as Article[];
  
  if (!category || category === 'all') {
    return castedStaticData;
  }
  return castedStaticData.filter(art => art.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  const castedStaticData = localStaticData as Article[];
  return castedStaticData.find(art => generateSlug(art.title) === slug);
}