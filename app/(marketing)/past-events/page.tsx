import React from "react";
import { prisma } from "@/lib/db/prisma";
import { EventGrid } from "@/components/events/event-grid";
import { History, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashback & Past Events — EventElite DAV College",
  description: "Browse completed campus events, past hackathons, and cultural fests.",
};

export default async function PastEventsPage() {
  const pastEvents = await prisma.event.findMany({
    where: {
      OR: [
        { status: "COMPLETED" },
        { endDate: { lt: new Date() } },
      ],
    },
    include: {
      category: true,
      _count: { select: { registrations: true } },
    },
    orderBy: { endDate: "desc" },
    take: 12,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <History className="w-3.5 h-3.5 text-blue-500" /> Campus Flashback Archive
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Past Events & Flashbacks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Revisit completed seminars, hackathons, championships, and cultural celebrations at DAV College.
        </p>
      </div>

      <EventGrid
        events={pastEvents as any}
        emptyTitle="No past events in archive"
        emptyDescription="Completed events will automatically appear here."
      />
    </div>
  );
}
