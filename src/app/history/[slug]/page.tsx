import { getArticleBySlug, getNewsFeed, generateSlug } from "../../../lib/newsStore";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleView from "../../../components/ArticleView";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: "Article Not Found | ZamboToday" };

  const primarySlug = generateSlug(article.title);
  const primaryCanonicalUrl = `https://www.zambotoday.com/news/${primarySlug}`;

  return {
    title: `${article.title} | ZamboToday`,
    description: article.content.slice(0, 160),
    alternates: {
      canonical: primaryCanonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 160),
      url: primaryCanonicalUrl,
      type: "article",
      images: [{ url: article.image_url }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content.slice(0, 160),
      images: [article.image_url],
    },
  };
}

export async function generateStaticParams() {
  const articles = getNewsFeed();
  return articles.map((art) => ({
    slug: generateSlug(art.title),
  }));
}

export default async function HistoricalSlugArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) notFound();

  const primarySlug = generateSlug(article.title);
  const primaryCanonicalUrl = `https://www.zambotoday.com/news/${primarySlug}`;

  return <ArticleView article={article} canonicalUrl={primaryCanonicalUrl} />;
}
