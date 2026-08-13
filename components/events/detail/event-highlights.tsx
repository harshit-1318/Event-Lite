import { formatDateRange } from "@/lib/utils";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventHighlightsProps {
  event: {
    startDate: Date | string;
    endDate: Date | string;
    time: string;
    venue: string;
  };
}

export function EventHighlights({ event }: EventHighlightsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-slate-400">Date</span>
          <p className="font-bold text-slate-900 dark:text-white">
            {formatDateRange(event.startDate, event.endDate)}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-slate-400">Timing</span>
          <p className="font-bold text-slate-900 dark:text-white">{event.time}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-slate-400">Venue</span>
          <p className="font-bold text-slate-900 dark:text-white truncate">{event.venue}</p>
        </div>
      </div>
    </div>
  );
}
