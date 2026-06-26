import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZamboToday",
    short_name: "ZamboToday",
    description: "Breaking News, Politics, Sports, Startups and Others",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: "#CC0000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
