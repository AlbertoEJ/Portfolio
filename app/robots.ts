import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/surveys/"],
      },
    ],
    sitemap: "https://albertoej.com/sitemap.xml",
  };
}
