import { formatCurrency, formatDateRange } from "@/lib/utils";
import { Calendar, MapPin, UserCheck } from "lucide-react";
import { ParticipationStatus } from "@prisma/client";

interface RegistrationModalBodyProps {
  event: any;
  currentUser: any;
  participationStatus: ParticipationStatus;
  setParticipationStatus: (s: ParticipationStatus) => void;
}

export function RegistrationModalBody({
  event,
  currentUser,
  participationStatus,
  setParticipationStatus,
}: RegistrationModalBodyProps) {
  const isFree = Number(event.fee) === 0;

  return (
    <div className="space-y-3 py-1 text-xs">
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{event.title}</h4>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>{formatDateRange(event.startDate, event.endDate)} ({event.time})</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700 font-semibold">
          <span className="text-slate-500">Ticket Fee:</span>
          <span className={isFree ? "text-emerald-600" : "text-blue-600 font-bold"}>{formatCurrency(event.fee)}</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
            <p className="text-slate-500 text-[10px]">{currentUser.email}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-blue-100 text-[10px] font-bold text-blue-700">{currentUser.role}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => setParticipationStatus(ParticipationStatus.ATTENDING)}
          className={`p-2 rounded-xl border text-xs font-semibold ${
            participationStatus === ParticipationStatus.ATTENDING
              ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500/20"
              : "border-slate-200 text-slate-700"
          }`}
        >
          General Attendee
        </button>
        <button
          type="button"
          onClick={() => setParticipationStatus(ParticipationStatus.NOT_ATTENDING)}
          className={`p-2 rounded-xl border text-xs font-semibold ${
            participationStatus === ParticipationStatus.NOT_ATTENDING
              ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500/20"
              : "border-slate-200 text-slate-700"
          }`}
        >
          Active Participant
        </button>
      </div>
    </div>
  );
}
