import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";
import ShareButton from "./ShareButton";

interface FeaturedGridProps {
  articles: Article[];
}

export default function FeaturedGrid({ articles }: FeaturedGridProps) {
  const featured = articles.slice(0, 8);
  if (featured.length === 0) return null;

  // Center hero (1), left desk (3), right list (4)
  const centerHero   = featured[0];
  const leftSecondary = featured.slice(1, 4);
  const rightTextList = featured.slice(4, 8);

  return (
    <section className="border-b border-neutral-200 pb-6" aria-label="Featured News">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ── LEFT DESK: 2 clean image cards ── */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1 border-neutral-200 pt-4 lg:pt-0 lg:border-r lg:pr-5">
          <div className="border-b border-neutral-900 pb-1 mb-2">
            <h3 className="text-[11px] font-black tracking-widest text-neutral-900 uppercase font-sans">
              FEATURED DESK
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {leftSecondary.slice(0, 2).map((art) => {
              const slug = generateSlug(art.title);
              return (
                <article key={art.title} className="group">
                  <Link
                    href={`/news/${slug}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200"
                  >
                    <Image
                      src={art.image_url}
                      alt={art.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </Link>
                  <div className="mt-2 space-y-1">
                    <span className="text-[9px] font-mono text-[#CC0000] font-black uppercase tracking-wider block">
                      {art.category === "other" ? "OTHERS" : art.category.toUpperCase()}
                    </span>
                    <Link href={`/news/${slug}`}>
                      <h4 className="font-sans font-bold text-sm text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                        {art.title}
                      </h4>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── CENTER: MAIN HERO ── */}
        <div className="lg:col-span-6 space-y-3 order-1 lg:order-2">
          <article className="group space-y-3">
            <Link
              href={`/news/${generateSlug(centerHero.title)}`}
              className="relative block aspect-[16/9] w-full overflow-hidden bg-neutral-100 border border-neutral-200"
            >
              <Image
                src={centerHero.image_url}
                alt={centerHero.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 650px"
                priority
                className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#CC0000] text-white text-[9px] font-mono font-black tracking-widest uppercase px-2 py-0.5">
                LEAD REPORT
              </div>
            </Link>
            <div className="space-y-2">
              <Link href={`/news/${generateSlug(centerHero.title)}`}>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black tracking-tight text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight">
                  {centerHero.title}
                </h2>
              </Link>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                {centerHero.content}
              </p>
              <div className="max-w-[120px]">
                <ShareButton article={centerHero} />
              </div>
            </div>
          </article>
        </div>

        {/* ── RIGHT LIST: 4 text-only briefings ── */}
        <div className="lg:col-span-3 order-3 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-4 lg:pt-0 lg:pl-5">
          <div className="border-b border-neutral-900 pb-1 mb-3">
            <h3 className="text-[11px] font-black tracking-widest text-neutral-900 uppercase font-sans">
              QUICK BRIEFINGS
            </h3>
          </div>
          {/* On mobile use a 2-col grid, on lg use stacked list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 divide-y divide-neutral-200 sm:divide-y-0 sm:gap-4 lg:divide-y lg:gap-0">
            {rightTextList.map((art) => {
              const slug = generateSlug(art.title);
              return (
                <article key={art.title} className="py-2.5 first:pt-0 group sm:py-0 lg:py-2.5 lg:first:pt-0">
                  <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">
                    {art.category === "other" ? "OTHERS" : art.category.toUpperCase()}
                  </span>
                  <Link href={`/news/${slug}`}>
                    <h4 className="font-sans font-black text-xs text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight mt-0.5">
                      {art.title}
                    </h4>
                  </Link>
                  <p className="text-neutral-500 text-[11px] line-clamp-2 mt-1 leading-normal">
                    {art.content}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
