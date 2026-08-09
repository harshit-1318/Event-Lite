import React from "react";
import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Users, Calendar, Trophy, DollarSign, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default async function AdminOverviewPage() {
  await requireAdmin();

  const [totalStudents, totalFaculty, totalEvents, totalRegistrations, latestLogs] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "FACULTY" } }),
    prisma.event.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.auditLog.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Admin Control Center 👑</h1>
        <p className="text-xs text-slate-500">System metrics, security audit trail, and campus-wide operations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Students" value={totalStudents} subtitle="Active Learners" icon={Users} colorClass="text-blue-600 bg-blue-50 dark:bg-blue-900/30" />
        <StatsCard title="Faculty Staff" value={totalFaculty} subtitle="Event Coordinators" icon={Trophy} colorClass="text-purple-600 bg-purple-50 dark:bg-purple-900/30" />
        <StatsCard title="Campus Events" value={totalEvents} subtitle="All Categories" icon={Calendar} colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" />
        <StatsCard title="Total Enrollments" value={totalRegistrations} subtitle="Confirmed Passes" icon={DollarSign} colorClass="text-amber-600 bg-amber-50 dark:bg-amber-900/30" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Security Audit Trail</h3>
          <Link href="/dashboard/admin/audit-logs" className="text-xs font-semibold text-blue-600 hover:underline">Full log viewer &rarr;</Link>
        </div>
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs font-mono">
          {latestLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <span className="text-slate-800 dark:text-slate-200"><strong className="text-blue-600">{log.action}</strong> by {log.user?.name || "System"}</span>
              <span className="text-slate-400 text-[11px]">{new Date(log.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
