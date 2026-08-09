import { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";

const BASE_URL = process.env.NEXTAUTH_URL || "https://eventelite.davjalandhar.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let events: { slug: string; updatedAt: Date }[] = [];
  try {
    events = await prisma.event.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      take: 100,
    });
  } catch {
    // Database fallback
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/events",
    "/past-events",
    "/about",
    "/contact",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE_URL}/events/${e.slug}`,
    lastModified: e.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...eventRoutes];
}
