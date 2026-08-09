import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EventTicker } from "@/components/layout/event-ticker";
import { prisma } from "@/lib/db/prisma";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch up to 5 upcoming published events for the ticker
  let tickerEvents: any[] = [];
  try {
    tickerEvents = await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate: { gte: new Date() },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        startDate: true,
      },
      orderBy: { startDate: "asc" },
      take: 5,
    });
  } catch (error) {
    // Graceful fallback if database connection is pending during build
    tickerEvents = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      {tickerEvents.length > 0 && <EventTicker events={tickerEvents} />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
