import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, generateSlug } from "../lib/newsStore";

interface CategorySectionProps {
  title: string;
  articles: Article[];
}

export default function CategorySection({
  title,
  articles,
}: CategorySectionProps) {
const displayArticles = articles.slice(0, 10);

if (displayArticles.length === 0) return null;

const leadArticle = displayArticles[0];

const sideArticles = displayArticles.slice(1, 5); // 1,2,3,4

const listArticles = displayArticles.slice(5, 10); // 5,6,7,8,9



  const categorySlug = title.toLowerCase();

  return (
    <section
      className="border-b border-neutral-200 pb-8 space-y-4"
      aria-label={`${title} Category Section`}
    >
      {/* Header */}
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 space-y-6">

          {/* Hero 1 */}
          <article className="group">
            <Link
              href={`/news/${generateSlug(leadArticle.title)}`}
              className="block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image
                  src={leadArticle.image_url}
                  alt={leadArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="mt-3">
              <Link href={`/news/${generateSlug(leadArticle.title)}`}>
                <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight tracking-tight">
                  {leadArticle.title}
                </h3>
              </Link>

              <p className="text-neutral-600 text-sm mt-2 line-clamp-3">
                {leadArticle.content}
              </p>

              <time className="text-[10px] text-neutral-400 font-mono mt-2 block">
                {new Date(
                  leadArticle.publishedAt
                ).toLocaleDateString()}
              </time>
            </div>
          </article>

          {/* Hero 2 */}
          {/* <article className="group border-t border-neutral-200 pt-5">
            <Link
              href={`/news/${generateSlug(leadArticle2.title)}`}
              className="block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image
                  src={leadArticle2.image_url}
                  alt={leadArticle2.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="mt-3">
              <Link href={`/news/${generateSlug(leadArticle2.title)}`}>
                <h3 className="font-sans font-extrabold text-lg lg:text-xl text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight tracking-tight">
                  {leadArticle2.title}
                </h3>
              </Link>

              <p className="text-neutral-600 text-sm mt-2 line-clamp-3">
                {leadArticle2.content}
              </p>

              <time className="text-[10px] text-neutral-400 font-mono mt-2 block">
                {new Date(
                  leadArticle2.publishedAt
                ).toLocaleDateString()}
              </time>
            </div>
          </article> */}

        </div>

        {/* CENTER COLUMN */}
        <div className="lg:col-span-4 border-l border-r border-neutral-200 px-4">

          <div className="space-y-4">

            {sideArticles.map((art) => {
              const slug = generateSlug(art.title);

              return (
                <article
                  key={art.title}
                  className="group flex gap-3 border-b border-neutral-100 pb-3"
                >
                  <Link
                    href={`/news/${slug}`}
                    className="relative w-[120px] h-[80px] flex-shrink-0 overflow-hidden bg-neutral-100 border border-neutral-200"
                  >
                    <Image
                      src={art.image_url}
                      alt={art.title}
                      fill
                      sizes="120px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link href={`/news/${slug}`}>
                      <h4 className="font-sans font-bold text-sm text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight tracking-tight">
                        {art.title}
                      </h4>
                    </Link>

                    <time className="text-[9px] text-neutral-400 font-mono block mt-1">
                      {new Date(
                        art.publishedAt
                      ).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              );
            })}

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3">

          <div className="divide-y divide-neutral-100">

            {listArticles.map((art) => {
              const slug = generateSlug(art.title);

              return (
                <article
                  key={art.title}
                  className="py-3 first:pt-0 group"
                >
                  <Link
                    href={`/news/${slug}`}
                    className="flex items-start gap-2 justify-between"
                  >
                    <h4 className="font-sans font-bold text-sm text-neutral-800 group-hover:text-[#CC0000] transition-colors leading-snug tracking-tight">
                      {art.title}
                    </h4>

                    <time className="text-[9px] text-neutral-400 font-mono flex-shrink-0 mt-0.5">
                      {new Date(
                        art.publishedAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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