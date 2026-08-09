"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cancelRegistrationAction } from "@/actions/registration.actions";
import { toast } from "sonner";
import { Calendar, MapPin, Clock, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface EnrolledEventItemProps {
  registration: {
    id: string;
    status: string;
    paymentStatus: string;
    event: {
      title: string;
      slug: string;
      venue: string;
      startDate: Date | string;
      endDate: Date | string;
      time: string;
      category?: { name: string } | null;
    };
  };
}

export function EnrolledEventItem({ registration }: EnrolledEventItemProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();
  const { event } = registration;

  const handleCancel = async () => {
    if (!confirm(`Cancel registration for "${event.title}"?`)) return;
    setIsCancelling(true);
    try {
      const res = await cancelRegistrationAction(registration.id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else toast.error(res.message);
    } catch {
      toast.error("Failed to cancel.");
    } finally {
      setIsCancelling(false);
    }
  };

  const isPaid = registration.paymentStatus === "PAID" || registration.paymentStatus === "FREE";

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          {event.category && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800">{event.category.name}</span>}
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{registration.paymentStatus}</span>
        </div>
        <Link href={`/events/${event.slug}`} className="block">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">{event.title}</h4>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-500" /> {formatDateRange(event.startDate, event.endDate)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-500" /> {event.time}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> {event.venue}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-center">
        <Link href={`/events/${event.slug}`}><Button size="sm" variant="outline" className="h-8 text-xs font-semibold rounded-xl">Details</Button></Link>
        <Button size="sm" variant="ghost" onClick={handleCancel} disabled={isCancelling} className="h-8 text-xs text-red-500 hover:bg-red-50 rounded-xl">
          {isCancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
        </Button>
      </div>
    </div>
  );
}
