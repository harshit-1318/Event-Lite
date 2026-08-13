import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/permissions/rbac";
import { notFound } from "next/navigation";
import {
  EventHeader,
  EventHighlights,
  EventSidebar,
  EventOrganizer,
  EventCard,
} from "@/components/events";
import { serializeEvent, serializeEvents } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) return { title: "Event Not Found" };
  return { title: `${event.title} — EventElite`, description: event.shortDescription || event.description.slice(0, 150) };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();

  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      category: true,
      organizer: { select: { id: true, name: true, email: true, department: true } },
      _count: { select: { registrations: { where: { status: "CONFIRMED" } } } },
    },
  });

  if (!event) notFound();

  const serializedEvent = serializeEvent(event);

  let userRegistration = null;
  if (user) {
    userRegistration = await prisma.registration.findUnique({
      where: { userId_eventId: { userId: user.id, eventId: event.id } },
    });
  }

  const relatedEvents = serializeEvents(
    await prisma.event.findMany({
      where: { categoryId: event.categoryId, id: { not: event.id }, status: "PUBLISHED" },
      include: { category: true, _count: { select: { registrations: true } } },
      take: 3,
    })
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/events" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Events
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <EventHeader event={serializedEvent} />
          <EventHighlights event={serializedEvent} />
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">About This Event</h3>
            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
              {event.description}
            </div>
          </div>
          <EventOrganizer organizer={event.organizer} />
        </div>
        <EventSidebar event={serializedEvent} currentUser={user} userRegistration={userRegistration} />
      </div>

      {relatedEvents.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Similar Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((rel) => (<EventCard key={rel.id} event={rel as any} />))}
          </div>
        </div>
      )}
    </div>
  );
}
