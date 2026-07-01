import { getSortedArticles } from "../../lib/newsStoreHelper";
import { generateSlug } from "../../lib/newsStore";

export async function GET() {
  const sorted = getSortedArticles();

  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  let newsArticles = sorted.filter(
    (art) => new Date(art.publishedAt) >= fortyEightHoursAgo
  );

  // Fallback to the latest 10 articles if the 48h filter yields empty results (safety fallback)
  if (newsArticles.length === 0) {
    newsArticles = sorted.slice(0, 10);
  }

  const xmlItems = newsArticles
    .map((art) => {
      const slug = generateSlug(art.title);
      const publishedIso = new Date(art.publishedAt).toISOString();
      
      // XML Escape titles
      const escapedTitle = art.title
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      return `  <url>
    <loc>https://www.zambotoday.com/news/${slug}</loc>
    <news:news>
      <news:publication>
        <news:name>ZamboToday</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishedIso}</news:publication_date>
      <news:title>${escapedTitle}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
    },
  });
}
