import React from "react";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";

interface BreakingTickerProps {
  articles: Article[];
}

export default function BreakingTicker({ articles }: BreakingTickerProps) {
  // Use the latest 20 articles
  const tickerArticles = articles.slice(0, 20);
  
  // Double the articles array to create a seamless continuous loop
  const doubledArticles = [...tickerArticles, ...tickerArticles];

  return (
    <div 
      className="bg-neutral-900 border-b border-neutral-800 text-white overflow-hidden py-2 select-none"
      aria-label="Breaking News Ticker"
    >
      <div className="max-w-7xl mx-auto flex items-center px-4">
        {/* Fixed Title Badge */}
        <div className="bg-[#CC0000] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest font-mono flex items-center gap-1.5 flex-shrink-0 z-10 mr-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>BREAKING WIRE</span>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative overflow-hidden w-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-0.5">
            {doubledArticles.map((art, idx) => {
              const slug = generateSlug(art.title);
              return (
                <Link
                  key={`${art.title}-${idx}`}
                  href={`/news/${slug}`}
                  className="inline-flex items-center gap-2 hover:text-[#CC0000] transition-colors text-xs font-semibold text-neutral-200 tracking-tight"
                >
                  <span className="text-neutral-500 font-mono text-[10px]">// {new Date(art.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span>{art.title}</span>
                  <span className="text-[#CC0000] mx-2 font-bold select-none">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
