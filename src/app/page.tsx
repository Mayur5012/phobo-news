// src/app/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { 
  getSortedArticles, 
  getPaddedArticlesByCategory, 
  getMostReadArticles 
} from "../lib/newsStoreHelper";
import { generateSlug } from "../lib/newsStore";
import BreakingTicker from "../components/BreakingTicker";
import FeaturedGrid from "../components/FeaturedGrid";
import CategorySection from "../components/CategorySection";
import MostRead from "../components/MostRead";
import LatestHeadlines from "../components/LatestHeadlines";
import ShareButton from "../components/ShareButton";
import { FileArchive, Landmark, Rocket, Trophy, Cpu } from "lucide-react";

// Homepage SEO Metadata
export const metadata: Metadata = {
  title: "Breaking News, Politics, Sports, Startups and Technology | ZamboToday",
  description: "Latest breaking news, politics, startups, technology, sports and global coverage from ZamboToday.",
  alternates: {
    canonical: "https://www.zambotoday.com",
  },
  openGraph: {
    title: "Breaking News, Politics, Sports, Startups and Technology | ZamboToday",
    description: "Latest breaking news, politics, startups, technology, sports and global coverage from ZamboToday.",
    url: "https://www.zambotoday.com",
    type: "website",
    siteName: "ZamboToday",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breaking News, Politics, Sports, Startups and Technology | ZamboToday",
    description: "Latest breaking news, politics, startups, technology, sports and global coverage from ZamboToday.",
  },
};

export default function HomePage() {
  const sortedArticles = getSortedArticles();
  
  // Hero Story (index 0)
  const heroArticle = sortedArticles[0];
  
  // Featured Stories (indices 1 to 8 of sortedArticles)
  const featuredArticles = sortedArticles.slice(1, 9);
  
  // Category datasets (padded to 12 articles each)
  const politicsArticles = getPaddedArticlesByCategory("politics", 12);
  const startupsArticles = getPaddedArticlesByCategory("startups", 12);
  const sportsArticles = getPaddedArticlesByCategory("sports", 12);
  const technologyArticles = getPaddedArticlesByCategory("technology", 12);
  
  // Sidebar data
  const mostReadArticles = getMostReadArticles(10);
  
  // Organization JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "ZamboToday",
    "url": "https://www.zambotoday.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.zambotoday.com/logo.png"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZamboToday"
    },
    "sameAs": [
      "https://x.com/zambotoday",
      "https://www.facebook.com/zambotoday",
      "https://www.linkedin.com/company/zambotoday"
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="space-y-6">
        
        {/* TICKER */}
        <BreakingTicker articles={sortedArticles} />

        {/* HERO & CENTERSTAGE AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Hero & Featured Grid (Left) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Main Hero (Article 0) */}
            {heroArticle && (
              <div className="border-b border-neutral-200 pb-6 animate-fade-in">
                <article className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  <Link 
                    href={`/news/${generateSlug(heroArticle.title)}`}
                    className="md:col-span-7 lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200 block w-full"
                  >
                    <Image
                      src={heroArticle.image_url}
                      alt={heroArticle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 800px"
                      priority
                      className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#CC0000] text-white text-[9px] font-mono font-black tracking-widest uppercase px-2 py-0.5 shadow-md">
                      TOP STORY
                    </div>
                  </Link>
                  
                  <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between h-full space-y-4 md:space-y-0">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#CC0000] font-black uppercase tracking-wider block">
                        {heroArticle.category === "other" ? "TECHNOLOGY" : heroArticle.category.toUpperCase()}
                      </span>
                      <Link href={`/news/${generateSlug(heroArticle.title)}`}>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black tracking-tight text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight">
                          {heroArticle.title}
                        </h2>
                      </Link>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-6 lg:line-clamp-8">
                        {heroArticle.content}
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t border-neutral-200 flex items-center justify-between mt-auto">
                      <time className="text-[10px] text-neutral-400 font-mono">
                        {new Date(heroArticle.publishedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <div className="max-w-[120px]">
                        <ShareButton article={heroArticle} />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* FEATURED STORIES GRID (8 stories) */}
            <FeaturedGrid articles={featuredArticles} />
            
          </div>

          {/* SIDEBAR: MOST POPULAR */}
          <aside className="lg:col-span-3 space-y-6 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0 lg:pl-6">
            <MostRead articles={mostReadArticles} />
          </aside>
        </div>

        {/* HIGH-DENSITY CATEGORY SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Category Feed */}
          <div className="lg:col-span-9 space-y-6">
            
            <CategorySection title="Politics" articles={politicsArticles} />
            <CategorySection title="Startups" articles={startupsArticles} />
            <CategorySection title="Sports" articles={sportsArticles} />
            <CategorySection title="Technology" articles={technologyArticles} />
          </div>

          {/* SIDEBAR: LATEST HEADLINES & ARCHIVE SPOTLIGHT */}
          <aside className="lg:col-span-3 space-y-6 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-6 lg:pt-0 lg:pl-6">
            {/* LATEST HEADLINES (30-50 text links) */}
            <LatestHeadlines articles={sortedArticles} />

            {/* ARCHIVE SPOTLIGHT (5+ links) */}
            <section className="bg-neutral-900 text-white border border-neutral-850 p-4 space-y-4" aria-label="Archive Spotlight">
              <div className="border-b border-neutral-800 pb-1.5 flex items-center gap-2">
                <FileArchive size={14} className="text-[#CC0000]" />
                <h3 className="text-xs font-black tracking-widest uppercase font-sans">
                  ARCHIVE SPOTLIGHT
                </h3>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                {/* Critical Expired Domain Authority URL */}
                <div className="group space-y-1">
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-widest block">// RETRIEVED</span>
                  <Link 
                    href="/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html"
                    className="font-bold text-neutral-200 group-hover:text-[#CC0000] transition-colors leading-tight"
                  >
                    Genealogy of Sultan Sharif Ul-Hashim of Sulu Sultanate
                  </Link>
                  <p className="text-[10px] text-neutral-500 leading-normal">
                    Historical lineage and origins of Sulu Sultanate maritime state.
                  </p>
                </div>

                <div className="h-[1px] bg-neutral-800" />

                <div className="group space-y-1">
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Landmark size={9} /> HISTORICAL INDEX
                  </span>
                  <Link 
                    href="/archives"
                    className="font-bold text-neutral-300 group-hover:text-[#CC0000] transition-colors"
                  >
                    ZamboToday Newspaper Archives Hub
                  </Link>
                </div>

                <div className="group space-y-1">
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Rocket size={9} /> LEGACY SECTOR
                  </span>
                  <Link 
                    href="/category/startups"
                    className="font-bold text-neutral-300 group-hover:text-[#CC0000] transition-colors"
                  >
                    Startups Historical Registry
                  </Link>
                </div>

                <div className="group space-y-1">
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Trophy size={9} /> CHAMPIONS DESK
                  </span>
                  <Link 
                    href="/category/sports"
                    className="font-bold text-neutral-300 group-hover:text-[#CC0000] transition-colors"
                  >
                    Sports Championships Archive
                  </Link>
                </div>

                <div className="group space-y-1">
                  <span className="text-[8px] font-mono text-neutral-500 font-bold uppercase tracking-widest block flex items-center gap-1">
                    <Cpu size={9} /> SYSTEM DESK
                  </span>
                  <Link 
                    href="/category/technology"
                    className="font-bold text-neutral-300 group-hover:text-[#CC0000] transition-colors"
                  >
                    Technology Wire Chronicles
                  </Link>
                </div>
              </div>
            </section>
          </aside>
        </div>

      </div>
    </>
  );
}