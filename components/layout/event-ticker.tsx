"use client";

import React from "react";
import Link from "next/link";
import { Zap, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

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
    <div className="bg-slate-100/90 dark:bg-slate-950 text-xs py-2 px-4 relative z-30 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0 bg-blue-600 dark:bg-blue-500/20 border border-blue-600 dark:border-blue-400/30 text-white dark:text-blue-300 px-2.5 py-0.5 rounded-full font-black text-[10px] tracking-wider uppercase shadow-xs">
          <Zap className="w-3 h-3 text-amber-300 dark:text-amber-400 fill-amber-300 dark:fill-amber-400" />
          <span>Live Ticker</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full relative mask-fade-x">
          <div className="inline-flex gap-10 animate-marquee items-center">
            {events.concat(events).map((event, idx) => (
              <Link
                key={`${event.id}-${idx}`}
                href={`/events/${event.slug}`}
                className="group inline-flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {formatDate(event.startDate)}
                </span>
                <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  {event.title}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 dark:text-amber-300 bg-blue-100/80 dark:bg-amber-400/15 border border-blue-200 dark:border-amber-400/20 px-2 py-0.5 rounded-md group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-amber-400/25 transition-all">
                  Register <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
