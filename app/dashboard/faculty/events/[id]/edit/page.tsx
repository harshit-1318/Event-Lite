import React from "react";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { EventForm } from "@/components/dashboard/faculty/event-form";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireFacultyOrAdmin();
  const { id } = await params;

  const [event, categories] = await Promise.all([
    prisma.event.findUnique({ where: { id } }),
    prisma.category.findMany({ select: { id: true, name: true } }),
  ]);

  if (!event) notFound();

  const formattedData = {
    ...event,
    fee: Number(event.fee),
    startDate: event.startDate.toISOString().split("T")[0],
    endDate: event.endDate.toISOString().split("T")[0],
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Edit Event</h1>
        <p className="text-xs text-slate-500">Update event details, timing, venue, or capacity limits.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <EventForm categories={categories} initialData={formattedData} />
      </div>
    </div>
  );
}
