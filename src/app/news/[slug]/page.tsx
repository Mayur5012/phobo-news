// src/app/news/[slug]/page.tsx
import { getArticleBySlug, getNewsFeed, generateSlug } from "../../../lib/newsStore";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>; // Explicitly type params as a Promise
}

// 1. Static Meta Injection Engine for SEO Web Rankings & Previews
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // Unwrapping the promise
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Chronicle Wire`,
    description: article.content.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 160),
      images: [{ url: article.image_url }],
    },
  };
}

// 2. Instructs Next.js to compile all entries to flat HTML links at build-time
export async function generateStaticParams() {
  const articles = getNewsFeed();
  return articles.map((art) => ({
    slug: generateSlug(art.title),
  }));
}

// 3. Ultra-Fast Server Component Render (Marked as async)
export default async function ArticleDetailedPage({ params }: Props) {
  const resolvedParams = await params; // Unwrapping the promise before reading slug
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto bg-white border border-neutral-200 p-4 sm:p-8 shadow-sm mt-6 space-y-6">
      <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition pb-2 border-b border-neutral-100 w-full">
        <ArrowLeft size={14} /> Back to News Grid
      </Link>

      <div className="space-y-4">
        <span className="text-xs bg-red-600 text-white font-black tracking-widest uppercase px-2 py-0.5">{article.category}</span>
        <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-neutral-900 leading-tight">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-neutral-400 font-mono border-y border-neutral-100 py-2 justify-between items-center">
          <span>FILED: {new Date(article.publishedAt).toLocaleString()}</span>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1 font-bold">
            View Source Wire <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="w-full overflow-hidden bg-neutral-100 aspect-[16/9]">
        <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <p className="text-neutral-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans antialiased">
        {article.content}
      </p>
    </div>
  );
}