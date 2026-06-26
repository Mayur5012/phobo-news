import React from "react";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";

interface MostReadProps {
  articles: Article[];
}

export default function MostRead({ articles }: MostReadProps) {
  // Take top 10 articles
  const topArticles = articles.slice(0, 10);

  if (topArticles.length === 0) return null;

  return (
    <section className="bg-neutral-50 border border-neutral-200 p-4 space-y-4" aria-label="Most Read Articles">
      <div className="border-b border-neutral-900 pb-1.5 flex items-center justify-between">
        <h3 className="text-xs font-black tracking-widest text-neutral-900 uppercase font-sans">
          MOST POPULAR
        </h3>
        <span className="text-[9px] font-mono text-neutral-400 font-semibold uppercase">
          Real-time Updates
        </span>
      </div>

      {/* Numbered Wire list - CNN/Reuters sidebar style */}
      <ol className="divide-y divide-neutral-200 font-sans">
        {topArticles.map((art, index) => {
          const slug = generateSlug(art.title);
          const rank = index + 1;
          
          return (
            <li 
              key={art.title} 
              className="py-3 first:pt-0 flex items-start gap-4 group"
              // Analytics hook points (supports future MongoDB view tracking)
              data-article-slug={slug}
              data-tracking-rank={rank}
            >
              {/* Massive Rank Indicator */}
              <span className="font-serif text-3xl font-black text-neutral-300 leading-none select-none group-hover:text-[#CC0000] transition-colors w-7 text-right">
                {rank}
              </span>
              <div className="space-y-1 flex-1">
                <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                  {art.category === "other" ? "OTHERS" : art.category}
                </span>
                <Link href={`/news/${slug}`}>
                  <h4 className="font-sans font-bold text-xs text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                    {art.title}
                  </h4>
                </Link>
                {/* View counts placeholder: Hook up to DB aggregation in production */}
                {/* <span className="text-[9px] font-mono text-neutral-400">{viewsCount} views</span> */}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
