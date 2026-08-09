import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";

interface FeaturedEventsProps {
  events: any[];
  userRegistrations: string[];
}

export function FeaturedEvents({ events, userRegistrations }: FeaturedEventsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Don&apos;t Miss Out</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Featured Upcoming Events</h2>
        </div>
        <Link href="/events">
          <Button variant="outline" className="rounded-xl text-xs font-semibold">
            Explore All &rarr;
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} isRegistered={userRegistrations.includes(event.id)} />
        ))}
      </div>
    </section>
  );
}
