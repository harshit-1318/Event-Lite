"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EventCardCapacity } from "@/components/events/event-card-capacity";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { EventStatus } from "@prisma/client";

export interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string | null;
    description: string;
    imageUrl?: string | null;
    venue: string;
    startDate: Date | string;
    endDate: Date | string;
    time: string;
    fee: any;
    capacity: number;
    status: EventStatus;
    category?: { name: string; slug: string } | null;
    _count?: { registrations: number };
  };
  isRegistered?: boolean;
}

export function EventCard({ event, isRegistered = false }: EventCardProps) {
  const registeredCount = event._count?.registrations ?? 0;
  const isSoldOut = registeredCount >= event.capacity;
  const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="group flex flex-col rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xs hover:shadow-lg hover:border-blue-500/40 transition-all duration-200 overflow-hidden">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img src={event.imageUrl || defaultImage} alt={event.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          {event.category && <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">{event.category.name}</span>}
          <div className="flex gap-1">
            {isRegistered && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Enrolled</span>}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${Number(event.fee) === 0 ? "bg-emerald-500/90 text-white" : "bg-blue-600/90 text-white"}`}>{formatCurrency(event.fee)}</span>
          </div>
        </div>
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <p className="text-[11px] font-medium flex items-center gap-1 text-slate-200 truncate"><MapPin className="w-3 h-3 text-blue-400 shrink-0" /><span className="truncate">{event.venue}</span></p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
            <Calendar className="w-3 h-3" /><span>{formatDateRange(event.startDate, event.endDate)}</span>•<Clock className="w-3 h-3" /><span>{event.time}</span>
          </div>
          <Link href={`/events/${event.slug}`} className="block">
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{event.title}</h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2">{event.shortDescription || event.description}</p>
        </div>

        <EventCardCapacity registeredCount={registeredCount} capacity={event.capacity} />

        <Link href={`/events/${event.slug}`} className="block pt-1">
          <Button size="sm" className={`w-full rounded-xl text-xs font-semibold ${isRegistered ? "bg-slate-100 text-slate-800 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
            {isRegistered ? "View Enrolled Pass" : isSoldOut ? "Event Full" : <>Register <ArrowRight className="w-3.5 h-3.5 ml-1" /></>}
          </Button>
        </Link>
      </div>
    </div>
  );
}
