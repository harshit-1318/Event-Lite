import React from "react";
import { EventCard, EventCardProps } from "@/components/events/event-card";
import { CalendarX, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EventGridProps {
  events: EventCardProps["event"][];
  registeredEventIds?: string[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EventGrid({
  events,
  registeredEventIds = [],
  emptyTitle = "No events found",
  emptyDescription = "There are no events matching your selected criteria.",
}: EventGridProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <CalendarX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {emptyTitle}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {emptyDescription}
        </p>
        <Link href="/events">
          <Button variant="outline" className="rounded-xl">
            Browse All Events
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isRegistered={registeredEventIds.includes(event.id)}
        />
      ))}
    </div>
  );
}
