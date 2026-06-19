// src/app/page.tsx
'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { getNewsFeed, generateSlug, Article } from "../lib/newsStore";
import { Share2, X, Link2, Code2 } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';

function XBrandIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.493h2.039L6.486 3.24H4.298L17.61 20.646Z" />
    </svg>
  );
}

function LinkedInBrandIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452Z" />
    </svg>
  );
}

function ShareDrawer({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const slug = generateSlug(article.title);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/news/${slug}` : '';
  const text = encodeURIComponent(`Breaking: ${article.title}`);

  const handleCopy = async (content: string, type?: 'embed') => {
    await navigator.clipboard.writeText(content);
    if (type === 'embed') {
      alert('Embed code copied!');
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-neutral-50 border border-neutral-200 rounded p-3 mt-3 text-xs space-y-2.5 shadow-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
        <span className="text-[9px] font-black tracking-wider text-neutral-500 uppercase">
          Share Wire
        </span>
        <button
          onClick={onClose}
          aria-label="Close share menu"
          className="text-neutral-400 hover:text-black transition-colors p-0.5"
        >
          <X size={12} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <a
          href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-black text-white py-1.5 px-2 font-bold text-[10px] hover:bg-neutral-800 transition-colors rounded-sm"
        >
          <XBrandIcon />
          X
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#0A66C2] text-white py-1.5 px-2 font-bold text-[10px] hover:bg-[#004182] transition-colors rounded-sm"
        >
          <LinkedInBrandIcon />
          LinkedIn
        </a>

        <button
          onClick={() => handleCopy(url)}
          className="flex items-center justify-center gap-1.5 bg-neutral-200 text-neutral-800 py-1.5 px-2 font-bold text-[10px] hover:bg-neutral-300 transition-colors rounded-sm"
        >
          <Link2 size={10} />
          {copied ? 'Copied!' : 'Copy URL'}
        </button>

        <button
          onClick={() =>
            handleCopy(
              `<iframe src="${url}" width="100%" height="450"></iframe>`,
              'embed'
            )
          }
          className="flex items-center justify-center gap-1.5 bg-neutral-800 text-white py-1.5 px-2 font-bold text-[10px] hover:bg-neutral-900 transition-colors rounded-sm"
        >
          <Code2 size={10} />
          Embed
        </button>
      </div>
    </div>
  );
}

function CategoryBadge({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  return (
    <span className={`text-[9px] text-red-600 font-black uppercase tracking-widest ${className}`}>
      {category}
    </span>
  );
}

function HeroArticle({
  article,
  activeShareId,
  onNavigate,
  onToggleShare,
}: {
  article: Article;
  activeShareId: string | null;
  onNavigate: (title: string) => void;
  onToggleShare: (e: React.MouseEvent, title: string) => void;
}) {
  const slug = generateSlug(article.title);

  return (
    <article
      onClick={() => onNavigate(article.title)}
      className="lg:col-span-2 space-y-3 sm:space-y-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-6 xl:pr-8 cursor-pointer group"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 rounded-sm">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          loading="eager"
        />
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-sm">
          {article.category}
        </span>
      </div>

      <div className="flex justify-between items-start gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-neutral-900 group-hover:text-red-700 transition-colors leading-tight">
          {article.title}
        </h2>
        <button
          onClick={(e) => onToggleShare(e, article.title)}
          aria-label="Share article"
          className="flex-shrink-0 p-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-600 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors rounded-sm mt-0.5"
        >
          <Share2 size={12} />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {activeShareId === slug && (
        <ShareDrawer article={article} onClose={() => onToggleShare({ stopPropagation: () => {} } as React.MouseEvent, article.title)} />
      )}

      <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
        {article.content}
      </p>
    </article>
  );
}

function SideArticle({
  article,
  activeShareId,
  onNavigate,
  onToggleShare,
}: {
  article: Article;
  activeShareId: string | null;
  onNavigate: (title: string) => void;
  onToggleShare: (e: React.MouseEvent, title: string) => void;
}) {
  const slug = generateSlug(article.title);

  return (
    <div
      onClick={() => onNavigate(article.title)}
      className="py-3.5 first:pt-0 group cursor-pointer"
    >
      <CategoryBadge category={article.category} className="block mb-0.5" />
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-sans font-bold text-sm tracking-tight text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <button
          onClick={(e) => onToggleShare(e, article.title)}
          aria-label="Share article"
          className="flex-shrink-0 text-neutral-400 hover:text-black p-1 transition-colors mt-0.5"
        >
          <Share2 size={12} />
        </button>
      </div>

      {activeShareId === slug && (
        <ShareDrawer article={article} onClose={() => onToggleShare({ stopPropagation: () => {} } as React.MouseEvent, article.title)} />
      )}
    </div>
  );
}

function GridArticleCard({
  article,
  activeShareId,
  onNavigate,
  onToggleShare,
}: {
  article: Article;
  activeShareId: string | null;
  onNavigate: (title: string) => void;
  onToggleShare: (e: React.MouseEvent, title: string) => void;
}) {
  const slug = generateSlug(article.title);

  return (
    <article
      onClick={() => onNavigate(article.title)}
      className="bg-white border border-neutral-200 flex flex-col cursor-pointer group hover:shadow-md transition-all duration-200 rounded-sm overflow-hidden"
    >
      <div className="aspect-video overflow-hidden bg-neutral-100">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-center">
          <CategoryBadge category={`// ${article.category}`} />
          <button
            onClick={(e) => onToggleShare(e, article.title)}
            aria-label="Share article"
            className="text-neutral-400 hover:text-black transition-colors p-0.5"
          >
            <Share2 size={12} />
          </button>
        </div>

        {activeShareId === slug && (
          <ShareDrawer article={article} onClose={() => onToggleShare({ stopPropagation: () => {} } as React.MouseEvent, article.title)} />
        )}

        <h4 className="font-serif font-bold text-sm sm:text-base text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>

        <p className="text-xs text-neutral-500 line-clamp-2 sm:line-clamp-3 leading-relaxed mt-auto pt-1">
          {article.content}
        </p>
      </div>
    </article>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-[16/9] bg-neutral-200 rounded-sm w-full" />
          <div className="h-6 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="h-4 bg-neutral-200 rounded w-5/6" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 py-3.5 border-b border-neutral-100">
              <div className="h-2.5 bg-neutral-200 rounded w-16" />
              <div className="h-4 bg-neutral-200 rounded w-full" />
              <div className="h-4 bg-neutral-200 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-neutral-200">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-neutral-200 rounded-sm overflow-hidden">
            <div className="aspect-video bg-neutral-200" />
            <div className="p-4 space-y-2">
              <div className="h-2.5 bg-neutral-200 rounded w-16" />
              <div className="h-4 bg-neutral-200 rounded w-full" />
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center space-y-3">
      <span className="text-4xl" aria-hidden>📡</span>
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
        No signal on <span className="text-neutral-600 font-bold">{category || "this feed"}</span>
      </p>
      <p className="text-xs text-neutral-400">Check back shortly for updates.</p>
    </div>
  );
}

function NewsFeedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get('cat') || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const result = getNewsFeed(activeCategory);
    setArticles(result);
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    const handleOutsideClick = () => setActiveShareId(null);
    if (activeShareId) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeShareId]);

  const handleNavigate = useCallback((title: string) => {
    router.push(`/news/${generateSlug(title)}`);
  }, [router]);

  const handleToggleShare = useCallback((e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    const slug = generateSlug(title);
    setActiveShareId((prev) => (prev === slug ? null : slug));
  }, []);

  if (loading) return <SkeletonLoader />;
  if (!articles.length) return <EmptyState category={activeCategory} />;

  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4, 15);

  return (
    <div className="space-y-8 sm:space-y-10">

      {heroArticle && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          <HeroArticle
            article={heroArticle}
            activeShareId={activeShareId}
            onNavigate={handleNavigate}
            onToggleShare={handleToggleShare}
          />

          <aside className="space-y-3">
            <h3 className="text-[10px] sm:text-xs font-black tracking-wider uppercase border-b-2 border-black pb-1.5 text-neutral-900">
              Latest Stream
            </h3>
            <div className="divide-y divide-neutral-200">
              {sideArticles.map((art) => (
                <SideArticle
                  key={art.title}
                  article={art}
                  activeShareId={activeShareId}
                  onNavigate={handleNavigate}
                  onToggleShare={handleToggleShare}
                />
              ))}
            </div>
          </aside>
        </section>
      )}

      {gridArticles.length > 0 && (
        <section className="pt-6 sm:pt-8 border-t border-neutral-200">
          <h3 className="text-[10px] sm:text-xs font-black tracking-wider uppercase border-b-2 border-black pb-1.5 text-neutral-900 mb-4 sm:mb-6">
            More Stories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {gridArticles.map((art) => (
              <GridArticleCard
                key={art.title}
                article={art}
                activeShareId={activeShareId}
                onNavigate={handleNavigate}
                onToggleShare={handleToggleShare}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <NewsFeedContent />
    </Suspense>
  );
} 