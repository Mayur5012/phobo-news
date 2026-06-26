// src/app/category/[category]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticlesByCategory } from "../../../lib/newsStoreHelper";
import { generateSlug } from "../../../lib/newsStore";

interface Props {
  params: Promise<{ category: string }>;
}

const VALID_CATEGORIES = new Set(["politics", "startups", "sports", "others"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams.category.toLowerCase();

  if (!VALID_CATEGORIES.has(category)) {
    return { title: "Category Not Found | ZamboToday" };
  }

  const titleCap = category.charAt(0).toUpperCase() + category.slice(1);
  const canonicalUrl = `https://www.zambotoday.com/category/${category}`;
  const description = `Follow the latest ${category} news, global wire feeds, reports, and real-time updates from ZamboToday.`;

  return {
    title: `${titleCap} News & Live Wire Reports | ZamboToday`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${titleCap} News & Live Wire Reports | ZamboToday`,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleCap} News & Live Wire Reports | ZamboToday`,
      description,
    },
  };
}

export async function generateStaticParams() {
  return Array.from(VALID_CATEGORIES).map((cat) => ({
    category: cat,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = resolvedParams.category.toLowerCase();

  if (!VALID_CATEGORIES.has(category)) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(category);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const canonicalUrl = `https://www.zambotoday.com/category/${category}`;

  // Breadcrumb schema
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
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="space-y-6">
        {/* Editorial Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-neutral-900 font-bold">{categoryLabel}</span>
        </nav>

        {/* Section Heading */}
        <div className="border-b-4 border-neutral-900 pb-2">
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-neutral-900 uppercase">
            {categoryLabel} DESK
          </h1>
          <p className="text-neutral-500 text-xs mt-1 leading-normal font-sans">
            Index of live wire reports, analytical briefings, and field updates covering {categoryLabel}.
          </p>
        </div>

        {categoryArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-neutral-200">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">NO ACTIVE REPORTS YET</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((art) => {
              const slug = generateSlug(art.title);
              return (
                <article 
                  key={art.title} 
                  className="bg-white border border-neutral-200 p-4 flex flex-col justify-between group hover:border-neutral-400 transition-colors shadow-xs"
                >
                  <div className="space-y-3">
                    <Link 
                      href={`/news/${slug}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-neutral-50 border border-neutral-100"
                    >
                      <Image
                        src={art.image_url}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      />
                    </Link>
                    
                    <div className="flex items-center justify-between text-[9px] font-mono border-b border-neutral-100 pb-1.5">
                      <span className="text-[#CC0000] uppercase font-black tracking-wider">
                        {categoryLabel}
                      </span>
                      <time className="text-neutral-400">
                        {new Date(art.publishedAt).toLocaleDateString()}
                      </time>
                    </div>

                    <Link href={`/news/${slug}`}>
                      <h2 className="font-sans font-bold text-sm text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                        {art.title}
                      </h2>
                    </Link>
                    
                    <p className="text-neutral-500 text-xs line-clamp-3 leading-normal">
                      {art.content}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-end">
                    <Link 
                      href={`/news/${slug}`}
                      className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-[#CC0000]"
                    >
                      Read Story →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination Ready Footer */}
        {categoryArticles.length > 0 && (
          <div className="border-t border-neutral-200 pt-6 flex justify-between items-center text-xs font-mono">
            <button className="px-3 py-1 bg-neutral-100 text-neutral-400 cursor-not-allowed uppercase text-[10px] font-bold" disabled>
              ← Prev
            </button>
            <span className="text-neutral-500">Page 1 of 1</span>
            <button className="px-3 py-1 bg-neutral-100 text-neutral-400 cursor-not-allowed uppercase text-[10px] font-bold" disabled>
              Next →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
