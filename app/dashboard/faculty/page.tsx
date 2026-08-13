import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { StatsCard } from "@/components/dashboard";
import { Calendar, Users, Clock, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function FacultyOverviewPage() {
  const user = await requireFacultyOrAdmin();

  const [myEvents, totalRegistrations, pendingCount] = await Promise.all([
    prisma.event.findMany({
      where: { organizerId: user.id },
      include: { category: true, _count: { select: { registrations: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.registration.count({
      where: { event: { organizerId: user.id }, status: "CONFIRMED" },
    }),
    prisma.registration.count({
      where: { event: { organizerId: user.id }, paymentStatus: "PENDING", status: "CONFIRMED" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Faculty Portal 👨‍🏫</h1>
          <p className="text-xs text-slate-500">Manage department events, track attendance rosters, and approve payments.</p>
        </div>
        <Link href="/dashboard/faculty/events/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold">
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Create Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="My Events" value={myEvents.length} subtitle="Published & Active" icon={Calendar} colorClass="text-purple-600 bg-purple-50 dark:bg-purple-900/30" />
        <StatsCard title="Total Attendees" value={totalRegistrations} subtitle="Students Registered" icon={Users} colorClass="text-blue-600 bg-blue-50 dark:bg-blue-900/30" />
        <StatsCard title="Pending Approvals" value={pendingCount} subtitle="Requires Review" icon={Clock} colorClass="text-amber-600 bg-amber-50 dark:bg-amber-900/30" />
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Managed Department Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myEvents.map((ev) => (
            <div key={ev.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800">{ev.category.name}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{ev.title}</h4>
                </div>
                <span className="text-xs font-bold text-blue-600">₹{Number(ev.fee)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>{ev._count.registrations} / {ev.capacity} enrolled</span>
                <Link href={`/dashboard/faculty/events/${ev.id}/edit`} className="text-blue-600 font-semibold hover:underline">Edit Event &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
