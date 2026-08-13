import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { EventForm } from "@/components/dashboard/faculty";

export default async function CreateEventPage() {
  await requireFacultyOrAdmin();

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Create New Event</h1>
        <p className="text-xs text-slate-500">Configure event details, dates, venue, capacity, and ticketing fee.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <EventForm categories={categories} />
      </div>
    </div>
  );
}
