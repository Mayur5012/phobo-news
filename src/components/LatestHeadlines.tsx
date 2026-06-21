import React from "react";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";

interface LatestHeadlinesProps {
  articles: Article[];
}

export default function LatestHeadlines({ articles }: LatestHeadlinesProps) {
  // Use 40 articles (within the 30-50 requirement)
  const headlines = articles.slice(0, 40);

  return (
    <section className="bg-white border border-neutral-200 p-4 space-y-4" aria-label="Latest Wire Headlines">
      <div className="border-b border-neutral-900 pb-1.5 flex items-center justify-between">
        <h3 className="text-xs font-black tracking-widest text-neutral-900 uppercase font-sans">
          LATEST HEADLINES
        </h3>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
            LIVE WIRE FEED
          </span>
        </div>
      </div>

      {/* Extremely dense scroll list for search bots & users */}
      <div className="divide-y divide-neutral-100 max-h-[700px] overflow-y-auto pr-1">
        {headlines.map((art) => {
          const slug = generateSlug(art.title);
          const timeString = new Date(art.publishedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          }) + " UTC";
          
          return (
            <div 
              key={art.title} 
              className="py-2 first:pt-0 hover:bg-neutral-50 transition-colors flex items-baseline gap-3 text-xs"
            >
              {/* GMT Timestamp */}
              <time className="text-neutral-400 font-mono text-[10px] w-14 flex-shrink-0">
                {timeString}
              </time>

              {/* Category Tag */}
              <span className="text-[9px] font-mono text-[#CC0000] font-black uppercase tracking-wider w-16 truncate hidden sm:inline-block">
                [{art.category === "other" ? "TECH" : art.category.toUpperCase()}]
              </span>

              {/* Title Link */}
              <Link 
                href={`/news/${slug}`}
                className="font-sans font-medium text-neutral-800 hover:text-[#CC0000] transition-colors leading-tight hover:underline flex-1"
              >
                {art.title}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
