import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";

interface CategorySectionProps {
  title: string;
  articles: Article[];
}

export default function CategorySection({ title, articles }: CategorySectionProps) {
  const displayArticles = articles.slice(0, 12);
  if (displayArticles.length === 0) return null;

  const leadArticle = displayArticles[0];
  const sideArticles = displayArticles.slice(1, 3);
  const listArticles = displayArticles.slice(3, 12);

  const categorySlug = title.toLowerCase();

  return (
    <section className="border-b border-neutral-200 pb-6 space-y-4" aria-label={`${title} Category Section`}>
      {/* Category Header */}
      <div className="border-b-2 border-neutral-900 pb-1 flex justify-between items-end">
        <h2 className="text-lg font-serif font-black tracking-tight text-neutral-900 uppercase">
          {title}
        </h2>
        <Link
          href={`/category/${categorySlug}`}
          className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#CC0000] hover:underline flex-shrink-0"
        >
          View All →
        </Link>
      </div>

      {/* 3-column grid: collapses to 1 column on mobile, 2 on tablet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

        {/* Lead Article (full width on mobile, half on tablet, 4 cols on desktop) */}
        <div className="md:col-span-1 lg:col-span-4 group">
          <article className="space-y-3 h-full flex flex-col">
            <Link
              href={`/news/${generateSlug(leadArticle.title)}`}
              className="relative block aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0"
            >
              <Image
                src={leadArticle.image_url}
                alt={leadArticle.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
            </Link>
            <div className="space-y-1.5 flex-1">
              <Link href={`/news/${generateSlug(leadArticle.title)}`}>
                <h3 className="font-sans font-extrabold text-sm sm:text-base text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                  {leadArticle.title}
                </h3>
              </Link>
              <p className="text-neutral-500 text-xs line-clamp-3 leading-relaxed">
                {leadArticle.content}
              </p>
              <time className="text-[9px] text-neutral-400 font-mono block">
                {new Date(leadArticle.publishedAt).toLocaleDateString(undefined, {
                  month: "short", day: "numeric",
                })}
              </time>
            </div>
          </article>
        </div>

        {/* Side Thumbnail Cards (full width on mobile, half on tablet, 4 cols on desktop) */}
        <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-4 border-t md:border-t-0 lg:border-l lg:border-r border-neutral-200 pt-4 md:pt-0 lg:px-5">
          {sideArticles.map((art) => {
            const slug = generateSlug(art.title);
            return (
              <article key={art.title} className="group grid grid-cols-12 gap-3 items-start">
                <Link
                  href={`/news/${slug}`}
                  className="col-span-4 relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 block"
                >
                  <Image
                    src={art.image_url}
                    alt={art.title}
                    fill
                    sizes="100px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </Link>
                <div className="col-span-8 space-y-1">
                  <Link href={`/news/${slug}`}>
                    <h4 className="font-sans font-bold text-xs text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight tracking-tight">
                      {art.title}
                    </h4>
                  </Link>
                  <time className="text-[9px] text-neutral-400 font-mono block">
                    {new Date(art.publishedAt).toLocaleDateString(undefined, {
                      month: "short", day: "numeric",
                    })}
                  </time>
                </div>
              </article>
            );
          })}
        </div>

        {/* Headline List (full width on mobile, spans both cols on tablet, 4 cols on desktop) */}
        <div className="md:col-span-2 lg:col-span-4 border-t lg:border-t-0 border-neutral-200 pt-4 lg:pt-0">
          <div className="divide-y divide-neutral-100">
            {listArticles.map((art) => {
              const slug = generateSlug(art.title);
              return (
                <article key={art.title} className="py-2 first:pt-0 group">
                  <Link href={`/news/${slug}`} className="flex items-start gap-2 justify-between">
                    <h4 className="font-sans font-bold text-xs text-neutral-800 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                      {art.title}
                    </h4>
                    <time className="text-[9px] text-neutral-400 font-mono flex-shrink-0 mt-0.5">
                      {new Date(art.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </time>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
