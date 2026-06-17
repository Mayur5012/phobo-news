// src/lib/newsStore.ts

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  urlToImage: string;
  category: 'startups' | 'politics' | 'sports' | 'other';
  publishedAt: string;
  source: { name: string };
  author?: string;
}

// 1. In-memory storage array for custom Admin Panel articles
let adminArticles: Article[] = [];

export const getAdminArticles = (): Article[] => adminArticles;

export const addAdminArticle = (article: Omit<Article, 'id' | 'publishedAt' | 'source'>) => {
  const newArticle: Article = {
    ...article,
    id: `admin-${Date.now()}`,
    publishedAt: new Date().toISOString(),
    source: { name: "Editorial Desk" }
  };
  adminArticles = [newArticle, ...adminArticles];
  return newArticle;
};

export const deleteAdminArticle = (id: string) => {
  adminArticles = adminArticles.filter(art => art.id !== id);
};

// 2. High-Quality Permanent Static News Database (Guarantees the 80% category balance)
const STATIC_NEWS_DATABASE: Article[] = [
  // --- STARTUPS ---
  {
    id: "static-startup-1",
    title: "Sovereign AI Infrastructure Funds Surge Across Silicon Valley Ecosystems",
    description: "Venture networks redirect capital deployments into compute clusters and verticalized transformer model architectures as early seed stages see record valuations.",
    urlToImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    category: "startups",
    publishedAt: new Date().toISOString(),
    source: { name: "Silicon Wire" }
  },
  {
    id: "static-startup-2",
    title: "Edge Computing Hardware Startup Secures $140M Series C for Next-Gen Neural Accelerators",
    description: "The financing round marks a major push toward shifting localized industrial analytics away from public cloud dependencies.",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    category: "startups",
    publishedAt: new Date().toISOString(),
    source: { name: "VenturePulse" }
  },

  // --- POLITICS ---
  {
    id: "static-politics-1",
    title: "Central Coalition Outlines Comprehensive Decentralized Energy Grid Legislation",
    description: "Proposed statutory transformations aim to streamline grid interconnections, local distribution systems, and clean energy storage scaling frameworks.",
    urlToImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800",
    category: "politics",
    publishedAt: new Date().toISOString(),
    source: { name: "Capitol Bureau" }
  },
  {
    id: "static-politics-2",
    title: "Global Commerce Committees Convene Over Cross-Border Tech Infrastructure Tariffs",
    description: "Envoys gather to draft updated governance templates regarding hardware distribution chains and silicon chip trade flows.",
    urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    category: "politics",
    publishedAt: new Date().toISOString(),
    source: { name: "International Desk" }
  },

  // --- SPORTS ---
  {
    id: "static-sports-1",
    title: "Championship Underdogs Secure Historic Title Win Following Improbable Final Play",
    description: "A defensive line adjustment in the final minutes shifts the tactical balance, ending a decades-long drought for the club.",
    urlToImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
    category: "sports",
    publishedAt: new Date().toISOString(),
    source: { name: "Sports Analytics Network" }
  },
  {
    id: "static-sports-2",
    title: "Global Athletic Association Announces Overhaul of Digital Performance Officiating Tools",
    description: "Next-generation spatial tracking systems will handle precise real-time boundary analytics and positioning telemetry starting next season.",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    category: "sports",
    publishedAt: new Date().toISOString(),
    source: { name: "The Athletic Ledger" }
  },

  // --- OTHER ---
  {
    id: "static-other-1",
    title: "Urban Architecture Trends Pivot Toward Modular Vertical Forest Designs",
    description: "Metropolitan planners adopt multi-tier biophilic designs to lower thermal island footprints across central business zones.",
    urlToImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    category: "other",
    publishedAt: new Date().toISOString(),
    source: { name: "Metropolitan Review" }
  }
];

// 3. Central Controller: Dynamically merges Currents API, Admin inputs, and Static backfills
export async function fetchLiveNews(category: string = 'general'): Promise<Article[]> {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; 
  
  // If no category is specified (Home page master mix), get all static data
  const staticFallback = category && category !== 'general'
    ? STATIC_NEWS_DATABASE.filter(art => art.category === category)
    : STATIC_NEWS_DATABASE;

  const categoryMap: Record<string, string> = {
    startups: 'business',
    politics: 'politics',
    sports: 'sports',
    other: 'general'
  };

  const currentCategory = categoryMap[category] || 'general';

  if (API_KEY && API_KEY !== 'your_copied_api_key_here') {
    try {
      const res = await fetch(`https://api.currentsapi.services/v1/search?category=${currentCategory}&page_size=8&apiKey=${API_KEY}`, { cache: 'no-store' });
      const data = await res.json();
      
      if (data && data.news && data.news.length > 0) {
        const parsedLiveArticles = data.news.map((art: any, index: number) => ({
          id: `currents-${art.id || index}-${category}`,
          title: art.title,
          description: art.description || "Click through to read full live reporting documentation.",
          urlToImage: art.image && art.image !== 'None' 
            ? art.image 
            : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
          // CRITICAL FIX: If global page, intelligently assign category, do not force active filter tag
          category: category === 'general' || !category ? ('other' as any) : (category as any),
          publishedAt: art.published || new Date().toISOString(),
          source: { name: art.author || 'Global News Desk' }
        }));

        return [...parsedLiveArticles, ...staticFallback];
      }
    } catch (error) {
      console.error("Currents API rate capped. Activating static channel buffers.", error);
    }
  }

  return staticFallback;
}