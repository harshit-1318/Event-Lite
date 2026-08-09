import React from "react";
import { requireAuth } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { EnrolledEventItem } from "@/components/dashboard/student/enrolled-event-item";
import { CalendarX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StudentRegistrationsPage() {
  const user = await requireAuth();

  const registrations = await prisma.registration.findMany({
    where: { userId: user.id, status: "CONFIRMED" },
    include: {
      event: { include: { category: true } },
    },
    orderBy: { registeredAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Enrolled Events</h1>
          <p className="text-xs text-slate-500">Manage your event passes, check payment approvals, and view schedules.</p>
        </div>
        <Link href="/events">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold">
            Explore More Events
          </Button>
        </Link>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-14 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <CalendarX className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No active registrations</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Browse through our campus catalog and register for workshops and fests.</p>
          <Link href="/events"><Button size="sm" className="bg-blue-600 text-white rounded-xl">Browse Catalog</Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {registrations.map((reg) => (
            <EnrolledEventItem key={reg.id} registration={reg as any} />
          ))}
        </div>
      )}
    </div>
  );
}
