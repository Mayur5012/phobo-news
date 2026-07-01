import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Googlebot-News", "Bingbot"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      "https://www.zambotoday.com/sitemap.xml",
      "https://www.zambotoday.com/news-sitemap.xml",
    ],
  };
}