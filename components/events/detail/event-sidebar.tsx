import { formatCurrency } from "@/lib/utils";
import { EventDetailClient } from "@/components/events/event-detail-client";
import { Users } from "lucide-react";

interface EventSidebarProps {
  event: any;
  currentUser: any;
  userRegistration: any;
}

export function EventSidebar({ event, currentUser, userRegistration }: EventSidebarProps) {
  const registeredCount = event._count?.registrations ?? 0;
  const seatsLeft = Math.max(0, event.capacity - registeredCount);
  const isFree = Number(event.fee) === 0;

  return (
    <div className="sticky top-24 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Registration Fee</span>
        <div className="text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(event.fee)}</div>
        <p className="text-[11px] text-slate-500">
          {isFree ? "✓ Free pass for all DAV College students" : "✓ Verification receipt approval required"}
        </p>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-500" /> Seats Available
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{seatsLeft} remaining</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all"
            style={{ width: `${Math.min(100, (registeredCount / event.capacity) * 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 text-right">{registeredCount} of {event.capacity} seats filled</p>
      </div>

      <EventDetailClient event={event} currentUser={currentUser} userRegistration={userRegistration} />

      <div className="pt-1 text-center text-[11px] text-slate-400 space-y-0.5">
        <p>🔒 Verified Student Credentials Required</p>
        <p>Instant digital confirmation</p>
      </div>
    </div>
  );
}
