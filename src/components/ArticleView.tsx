import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Article, generateSlug } from "../lib/newsStore";
import ShareButton from "./ShareButton";

interface ArticleViewProps {
  article: Article;
  canonicalUrl: string;
}

export default function ArticleView({ article, canonicalUrl }: ArticleViewProps) {
  const slug = generateSlug(article.title);
  
  // Format dates for display and schema
  const displayDate = new Date(article.publishedAt).toLocaleString();
  const isoDate = new Date(article.publishedAt).toISOString();
  
  // JSON-LD NewsArticle Schema
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.content.slice(0, 160),
    "image": [article.image_url],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Organization",
      "name": "ZamboToday",
      "url": "https://www.zambotoday.com"
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "ZamboToday",
      "url": "https://www.zambotoday.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.zambotoday.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  // JSON-LD BreadcrumbList Schema
  const categorySlug = article.category === "other" ? "others" : article.category.toLowerCase();
  const categoryLabel = article.category === "other" ? "others" : article.category;
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zambotoday.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryLabel,
        "item": `https://www.zambotoday.com/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 p-4 sm:p-8 shadow-xs mt-6 space-y-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition pb-2 border-b border-neutral-100 w-full"
        >
          <ArrowLeft size={14} /> Back to News Grid
        </Link>

        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs bg-[#CC0000] text-white font-mono font-black tracking-widest uppercase px-2 py-0.5">
              {article.category === "other" ? "OTHERS" : article.category.toUpperCase()}
            </span>
            <div className="max-w-[120px]">
              <ShareButton article={article} />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-neutral-900 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-neutral-400 font-mono border-y border-neutral-100 py-2 justify-between items-center">
            <span>FILED: {displayDate}</span>
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#CC0000] hover:underline flex items-center gap-1 font-bold"
            >
              View Source Wire <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* next/image Optimization - Responsive container aspect-16/9 to avoid CLS */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200">
          <Image 
            src={article.image_url} 
            alt={article.title} 
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            className="object-cover"
          />
        </div>

        <p className="text-neutral-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans antialiased">
          {article.content}
        </p>
      </div>
    </>
  );
}
