import React from "react";
import { prisma } from "@/lib/db/prisma";
import { EventGrid } from "@/components/events/event-grid";
import { History, Sparkles, Trophy, Award } from "lucide-react";
import { serializeEvents } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashback & Past Events — EventElite DAV College",
  description: "Browse completed campus events, past hackathons, and cultural fests.",
};

export default async function PastEventsPage() {
  const rawEvents = await prisma.event.findMany({
    where: {
      OR: [{ status: "COMPLETED" }, { endDate: { lt: new Date() } }],
    },
    include: {
      category: true,
      _count: { select: { registrations: true } },
    },
    orderBy: { endDate: "desc" },
    take: 12,
  });
  const pastEvents = serializeEvents(rawEvents);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-10 text-white space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
          <History className="w-3.5 h-3.5 text-blue-400" /> Campus Flashback Archive
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Past Events & Flashbacks
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Revisit completed seminars, hackathons, championships, and cultural celebrations at DAV College.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
          <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-amber-400" /> 100+ Annual Competitions</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-400" /> 5,000+ Certificates Issued</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-400" /> 106-Year Tradition</span>
        </div>
      </div>

      <EventGrid
        events={pastEvents as any}
        emptyTitle="No past events in archive"
        emptyDescription="Completed events will automatically appear here."
      />
    </div>
  );
}
