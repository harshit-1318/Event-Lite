import React from "react";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/permissions/rbac";
import { EventFilters } from "@/components/events/event-filters";
import { EventGrid } from "@/components/events/event-grid";
import { EventsPagination } from "@/components/events/events-pagination";
import { Metadata } from "next";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Browse Events — EventElite",
  description: "Search and filter campus events, hackathons, and fests at DAV College.",
};

interface EventsPageProps {
  searchParams: Promise<{ search?: string; category?: string; fee?: string; sort?: string; page?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { search, category, fee, sort, page } = await searchParams;
  const user = await getCurrentUser();

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const where: Prisma.EventWhereInput = { status: "PUBLISHED" };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { venue: { contains: search, mode: "insensitive" } },
    ];
  }
  if (category && category !== "all") where.category = { slug: category };
  if (fee === "free") where.fee = { equals: 0 };
  else if (fee === "paid") where.fee = { gt: 0 };

  const orderBy: Prisma.EventOrderByWithRelationInput =
    sort === "latest" ? { createdAt: "desc" } : sort === "title" ? { title: "asc" } : { startDate: "asc" };

  const pageSize = 9;
  const currentPage = Number(page) || 1;

  const [events, totalEvents] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { category: true, _count: { select: { registrations: true } } },
      orderBy,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.event.count({ where }),
  ]);

  let userRegistrations: string[] = [];
  if (user) {
    const regs = await prisma.registration.findMany({
      where: { userId: user.id, status: "CONFIRMED" },
      select: { eventId: true },
    });
    userRegistrations = regs.map((r) => r.eventId);
  }

  const totalPages = Math.ceil(totalEvents / pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Campus Events</h1>
        <p className="text-xs text-slate-500">Discover and register for upcoming collegiate sessions.</p>
      </div>

      <EventFilters categories={categories} />
      <EventGrid events={events as any} registeredEventIds={userRegistrations} />
      <EventsPagination currentPage={currentPage} totalPages={totalPages} search={search} category={category} fee={fee} sort={sort} />
    </div>
  );
}
