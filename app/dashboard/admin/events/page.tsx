import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { EventGrid } from "@/components/events";
import { Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { serializeEvents } from "@/lib/utils";

export default async function AdminEventsPage() {
  await requireAdmin();

  const events = serializeEvents(
    await prisma.event.findMany({
      include: { category: true, _count: { select: { registrations: true } } },
      orderBy: { startDate: "desc" },
    })
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Platform Inventory
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Global Events Management</h1>
          <p className="text-xs text-slate-500">Supervise, inspect, and modify all campus events across all departments.</p>
        </div>
        <Link href="/dashboard/faculty/events/create">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold">
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add New Event
          </Button>
        </Link>
      </div>

      <EventGrid events={events as any} />
    </div>
  );
}
