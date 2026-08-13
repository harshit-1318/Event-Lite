import type { ReactNode } from "react";
import { Navbar, Footer, EventTicker } from "@/components/layout";
import { prisma } from "@/lib/db/prisma";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
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
      take: 8,
    });
  } catch (error) {
    tickerEvents = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      <Navbar />
      {tickerEvents.length > 0 && <EventTicker events={tickerEvents} />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
