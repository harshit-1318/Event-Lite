import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXTAUTH_URL || "https://eventelite.davjalandhar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/events", "/past-events", "/about", "/contact"],
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
