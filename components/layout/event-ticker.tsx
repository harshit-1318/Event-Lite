"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";

interface EventTickerProps {
  events: Array<{
    id: string;
    title: string;
    slug: string;
    startDate: Date | string;
  }>;
}

export function EventTicker({ events }: EventTickerProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs py-1.5 px-4 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-blue-400 font-semibold shrink-0 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
          <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[10px]">What&apos;s New</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full relative">
          <div className="inline-flex gap-8 animate-marquee">
            {events.concat(events).map((event, idx) => (
              <Link
                key={`${event.id}-${idx}`}
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Calendar className="w-3 h-3 text-slate-400" />
                <span className="font-medium text-[11px]">{event.title}</span>
                <span className="text-slate-400 text-[10px]">• Enroll Now &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
