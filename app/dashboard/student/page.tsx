import React from "react";
import { requireAuth } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EnrolledEventItem } from "@/components/dashboard/student/enrolled-event-item";
import { Calendar, CheckCircle2, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StudentOverviewPage() {
  const user = await requireAuth();

  const [registrations, paidCount, pendingCount] = await Promise.all([
    prisma.registration.findMany({
      where: { userId: user.id, status: "CONFIRMED" },
      include: {
        event: { include: { category: true } },
      },
      orderBy: { registeredAt: "desc" },
      take: 4,
    }),
    prisma.registration.count({
      where: { userId: user.id, status: "CONFIRMED", paymentStatus: { in: ["PAID", "FREE"] } },
    }),
    prisma.registration.count({
      where: { userId: user.id, status: "CONFIRMED", paymentStatus: "PENDING" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Welcome back, {user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-xs text-slate-500">
          Track your enrolled sessions, participation passes, and upcoming campus activities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Enrolled" value={registrations.length} subtitle="Active Registrations" icon={Calendar} colorClass="text-blue-600 bg-blue-50 dark:bg-blue-900/30" />
        <StatsCard title="Confirmed Passes" value={paidCount} subtitle="Access Guaranteed" icon={CheckCircle2} colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" />
        <StatsCard title="Pending Approvals" value={pendingCount} subtitle="Receipt Verification" icon={Clock} colorClass="text-amber-600 bg-amber-50 dark:bg-amber-900/30" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Enrolled Events</h3>
          <Link href="/dashboard/student/registrations" className="text-xs font-semibold text-blue-600 hover:underline">
            View all ({registrations.length}) &rarr;
          </Link>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-10 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Trophy className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No event enrollments yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Explore upcoming hackathons, cultural fests, and workshops on campus.</p>
            <Link href="/events"><Button size="sm" className="bg-blue-600 text-white rounded-xl">Browse Events</Button></Link>
          </div>
        ) : (
          <div className="space-y-3">
            {registrations.map((reg) => (
              <EnrolledEventItem key={reg.id} registration={reg as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
