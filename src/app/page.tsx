// src/app/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { fetchLiveNews, getAdminArticles, Article } from "../lib/newsStore";
import { Clock, BookOpen, X } from "lucide-react";
import { useSearchParams } from 'next/navigation';

// 1. Separate the logic into a child component that safely consumes search parameters
function NewsFeedContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('cat') || "";
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (activeCategory) {
        const live = await fetchLiveNews(activeCategory);
        const admin = getAdminArticles().filter(a => a.category === activeCategory);
        setArticles([...admin, ...live]);
      } else {
        const startups = await fetchLiveNews('startups');
        const politics = await fetchLiveNews('politics');
        const sports = await fetchLiveNews('sports');
        const admin = getAdminArticles();
        setArticles([...admin, ...startups, ...politics, ...sports]);
      }
      setLoading(false);
    }
    loadData();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="text-center py-24 font-mono text-xs uppercase tracking-widest text-neutral-400 animate-pulse">
        Syncing Live Agency Feeds...
      </div>
    );
  }

  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 5);
  const gridArticles = articles.slice(5, 14);

  return (
    <div className="space-y-8">
      <div className="border-y border-neutral-300 py-2 flex justify-between items-center text-xs uppercase tracking-wider text-neutral-500 font-semibold">
        <span>Active Feed: {activeCategory ? activeCategory : "All Desks (Weighted)"}</span>
        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
      </div>

      {heroArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero Spotlight */}
          <div 
            onClick={() => setSelectedArticle(heroArticle)}
            className="lg:col-span-2 space-y-4 border-r border-neutral-200 pr-0 lg:pr-8 cursor-pointer group"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
              <img src={heroArticle.urlToImage} alt={heroArticle.title} className="object-cover w-full h-full group-hover:scale-102 transition duration-300"/>
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5">{heroArticle.category}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight leading-tight text-neutral-900 group-hover:text-red-700 transition">
              {heroArticle.title}
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed">{heroArticle.description}</p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2">
              <span className="text-red-600 font-bold uppercase">{heroArticle.source.name}</span>
              <span className="flex items-center gap-1"><Clock size={12}/>{new Date(heroArticle.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <h3 className="text-sm font-black tracking-wider uppercase border-b-2 border-black pb-1 text-neutral-900">LATEST ENTRIES</h3>
            <div className="divide-y divide-neutral-200">
              {sideArticles.map((art) => (
                <div key={art.id} onClick={() => setSelectedArticle(art)} className="py-3 first:pt-0 group cursor-pointer">
                  <span className="text-[10px] text-red-600 font-black uppercase tracking-wider block mb-0.5">{art.category}</span>
                  <h4 className="font-sans font-bold text-sm tracking-tight text-neutral-900 group-hover:text-red-700 transition line-clamp-2">{art.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <hr className="border-neutral-300" />

      {/* Bottom Grid */}
      <div>
        <h3 className="text-sm font-black tracking-wider uppercase border-b-2 border-black pb-1 mb-6 text-neutral-900">ADDITIONAL WIRE COVERAGE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridArticles.map((art) => (
            <div key={art.id} onClick={() => setSelectedArticle(art)} className="bg-white border border-neutral-200 flex flex-col justify-between p-4 shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className="space-y-3">
                <img src={art.urlToImage} alt={art.title} className="w-full h-40 object-cover bg-neutral-100" />
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">// {art.category}</span>
                <h4 className="font-serif font-bold text-base text-neutral-900 group-hover:text-red-700 transition line-clamp-2">{art.title}</h4>
                <p className="text-xs text-neutral-600 line-clamp-3">{art.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PREMIUM DETAIL READER MODAL FRAME --- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto relative rounded-none shadow-2xl border border-neutral-400">
            {/* Top Modal Controls */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center z-10">
              <span className="text-xs font-black tracking-widest uppercase text-red-600 flex items-center gap-1.5">
                <BookOpen size={14}/> LIVE WIRE REPORT // {selectedArticle.category}
              </span>
              <button onClick={() => setSelectedArticle(null)} className="text-neutral-400 hover:text-black transition p-1">
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body Content */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl md:text-3xl font-serif font-black tracking-tight text-neutral-900 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex gap-4 text-xs text-neutral-400 font-mono border-y border-neutral-100 py-2">
                <span>SOURCE: <strong className="text-neutral-700">{selectedArticle.source.name}</strong></span>
                <span>FILED: {new Date(selectedArticle.publishedAt).toLocaleString()}</span>
              </div>
              <img src={selectedArticle.urlToImage} alt={selectedArticle.title} className="w-full object-cover max-h-80 bg-neutral-100" />
              <p className="text-neutral-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans">
                {selectedArticle.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Wrap everything in a top-level Suspense Boundary to pass Vercel static checks
export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-24 font-mono text-xs uppercase tracking-widest text-neutral-400">Loading Terminal Layout...</div>}>
      <NewsFeedContent />
    </Suspense>
  );
}