// src/app/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { getNewsFeed, getArticleBySlug, generateSlug, Article } from "../lib/newsStore";
import { Clock, BookOpen, X, Share2, Link2, Code, Check, ArrowLeft, ExternalLink } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';

function NewsFeedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeCategory = searchParams.get('cat') || "";
  const targetArticleSlug = searchParams.get('id') || "";
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Track which specific article has its share menu active on the front grid
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (targetArticleSlug) {
      const art = getArticleBySlug(targetArticleSlug);
      if (art) setSelectedArticle(art);
    } else {
      setSelectedArticle(null);
    }
    setArticles(getNewsFeed(activeCategory));
  }, [activeCategory, targetArticleSlug]);

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateToArticle = (title: string) => {
    router.push(`/?id=${generateSlug(title)}${activeCategory ? `&cat=${activeCategory}` : ''}`);
  };

  const closeReader = () => {
    router.push(activeCategory ? `/?cat=${activeCategory}` : '/');
    setActiveShareId(null);
  };

  const toggleShareMenu = (e: React.MouseEvent, title: string) => {
    e.stopPropagation(); // Stop click from trigger card link navigation
    const slug = generateSlug(title);
    setActiveShareId(activeShareId === slug ? null : slug);
  };

  // --- RENDERING MODULE A: DETAILED ARTICLE FULL PAGE VIEW ---
  if (selectedArticle) {
    const currentSlug = generateSlug(selectedArticle.title);
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?id=${currentSlug}` : '';
    const shareText = encodeURIComponent(`Breaking: ${selectedArticle.title}`);

    return (
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 p-4 sm:p-8 shadow-sm animate-fade-in mt-2 space-y-6">
        <button onClick={closeReader} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition pb-2 border-b border-neutral-100 w-full">
          <ArrowLeft size={14} /> Back to News Grid
        </button>

        <div className="space-y-4">
          <span className="text-xs bg-red-600 text-white font-black tracking-widest uppercase px-2 py-0.5">{selectedArticle.category}</span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-neutral-900 leading-tight">{selectedArticle.title}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-neutral-400 font-mono border-y border-neutral-100 py-2 justify-between items-center">
            <span>FILED: {new Date(selectedArticle.publishedAt).toLocaleString()}</span>
            <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1 font-bold">
              View Source Wire <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="w-full overflow-hidden bg-neutral-100 aspect-[16/9]">
          <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-full object-cover" />
        </div>

        {/* Persistent Share Bar inside Reader */}
        <div className="bg-neutral-50 border border-neutral-200 p-4 space-y-2">
          <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500">Distribution Hub</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <a href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black text-white px-3 py-2 justify-center font-bold hover:opacity-90">X / Twitter</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-700 text-white px-3 py-2 justify-center font-bold hover:opacity-90">LinkedIn</a>
            <button onClick={() => handleCopyLink(shareUrl)} className="flex items-center gap-2 bg-neutral-200 text-neutral-800 px-3 py-2 justify-center font-bold hover:bg-neutral-300">
              {copied ? <Check size={14} className="text-emerald-600" /> : <Link2 size={14} />} Copy URL
            </button>
            <button onClick={() => handleCopyLink(`<iframe src="${shareUrl}" width="100%" height="450" frameborder="0"></iframe>`)} className="flex items-center gap-2 bg-neutral-800 text-white px-3 py-2 justify-center font-bold hover:bg-neutral-900">
              <Code size={14} /> Embed Iframe
            </button>
          </div>
        </div>

        <p className="text-neutral-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans antialiased">{selectedArticle.content}</p>
      </div>
    );
  }

  // --- RENDERING MODULE B: FRONT EDITORIAL SECTOR FEED GRID ---
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4, 13);

  // Reusable inline panel component to avoid redundancy
  const renderSharedDrawer = (article: Article) => {
    const slug = generateSlug(article.title);
    const url = typeof window !== 'undefined' ? `${window.location.origin}/?id=${slug}` : '';
    const text = encodeURIComponent(`Breaking on Chronicle: ${article.title}`);

    return (
      <div className="bg-neutral-50 border border-neutral-300 p-3 mt-3 text-xs space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-neutral-200 pb-1">
          <span className="text-[9px] font-black tracking-wider text-neutral-500 uppercase">TRANSMISSION LINKS</span>
          <button onClick={() => setActiveShareId(null)} className="text-neutral-400 hover:text-black"><X size={12}/></button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <a href={`https://x.com/intent/tweet?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" className="bg-black text-white py-1 px-2 font-bold text-center flex items-center justify-center gap-1">X</a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white py-1 px-2 font-bold text-center flex items-center justify-center gap-1">LinkedIn</a>
          <button onClick={() => handleCopyLink(url)} className="bg-neutral-200 text-neutral-800 py-1 px-2 font-bold text-center flex items-center justify-center gap-1">
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button onClick={() => handleCopyLink(`<iframe src="${url}" width="100%" height="400"></iframe>`)} className="bg-neutral-800 text-white py-1 px-2 font-bold text-center flex items-center justify-center gap-1">Embed</button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="border-y border-neutral-300 py-2 flex flex-col sm:flex-row justify-between items-center text-xs uppercase tracking-wider text-neutral-500 font-semibold gap-2">
        <span>Current Sector Desk: <strong className="text-neutral-900 font-bold">{activeCategory ? activeCategory : "All Core Streams"}</strong></span>
        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
      </div>

      {heroArticle ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Massive Front Hero Card */}
          <div 
            onClick={() => navigateToArticle(heroArticle.title)} 
            className="lg:col-span-2 space-y-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-8 cursor-pointer group relative"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
              <img src={heroArticle.image_url} alt={heroArticle.title} className="w-full h-full object-cover group-hover:scale-101 transition duration-500" />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5">{heroArticle.category}</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight text-neutral-900 group-hover:text-red-700 transition">
                {heroArticle.title}
              </h2>
              <button 
                onClick={(e) => toggleShareMenu(e, heroArticle.title)}
                className="mt-1 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-none border border-neutral-300 flex items-center gap-1 text-xs font-bold uppercase transition"
              >
                <Share2 size={14} /> Share
              </button>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">{heroArticle.content}</p>
            <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
              <Clock size={12}/>{new Date(heroArticle.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>

            {/* Exposed Main Front Drawer Share Component */}
            {activeShareId === generateSlug(heroArticle.title) && renderSharedDrawer(heroArticle)}
          </div>

          {/* Right Compact Wire Feed Stream */}
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-wider uppercase border-b-2 border-black pb-1 text-neutral-900">LATEST BULLETINS</h3>
            <div className="divide-y divide-neutral-200">
              {sideArticles.map((art) => {
                const isShareOpen = activeShareId === generateSlug(art.title);
                return (
                  <div key={art.title} onClick={() => navigateToArticle(art.title)} className="py-3.5 first:pt-0 group cursor-pointer block relative">
                    <span className="text-[9px] text-red-600 font-black uppercase tracking-widest block mb-0.5">{art.category}</span>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-sans font-bold text-sm tracking-tight text-neutral-900 group-hover:text-red-700 transition line-clamp-2">{art.title}</h4>
                      <button onClick={(e) => toggleShareMenu(e, art.title)} className="text-neutral-400 hover:text-black p-1" title="Share Bulletin">
                        <Share2 size={13} />
                      </button>
                    </div>
                    {isShareOpen && renderSharedDrawer(art)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-neutral-300 text-neutral-400 text-sm italic">No entries verified on this channel terminal node.</div>
      )}

      {/* Grid Cards Section */}
      {gridArticles.length > 0 && (
        <>
          <hr className="border-neutral-300" />
          <div>
            <h3 className="text-xs font-black tracking-wider uppercase border-b-2 border-black pb-1 mb-6 text-neutral-900">ADDITIONAL WIRE FEED COVERAGE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((art) => {
                const isShareOpen = activeShareId === generateSlug(art.title);
                return (
                  <div key={art.title} onClick={() => navigateToArticle(art.title)} className="bg-white border border-neutral-200 flex flex-col justify-between p-4 shadow-xs hover:shadow-md transition cursor-pointer group relative">
                    <div className="space-y-3">
                      <div className="aspect-video w-full overflow-hidden bg-neutral-100">
                        <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-101 transition duration-300" />
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[9px] text-neutral-400 font-black uppercase tracking-widest block">// {art.category}</span>
                        <button onClick={(e) => toggleShareMenu(e, art.title)} className="text-neutral-400 hover:text-black p-1" title="Share">
                          <Share2 size={13} />
                        </button>
                      </div>
                      <h4 className="font-serif font-bold text-base text-neutral-900 group-hover:text-red-700 transition line-clamp-2">{art.title}</h4>
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">{art.content}</p>
                    </div>
                    
                    {isShareOpen && (
                      <div className="mt-2">
                        {renderSharedDrawer(art)}
                      </div>
                    )}
                    
                    <div className="border-t border-neutral-100 pt-3 mt-4 flex justify-end text-[10px] text-neutral-400 font-mono">
                      <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-24 font-mono text-xs uppercase tracking-widest text-neutral-400">Loading Front Grid...</div>}>
      <NewsFeedContent />
    </Suspense>
  );
}