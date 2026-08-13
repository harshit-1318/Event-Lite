import { Users } from "lucide-react";

interface EventCardCapacityProps {
  registeredCount: number;
  capacity: number;
}

export function EventCardCapacity({ registeredCount, capacity }: EventCardCapacityProps) {
  const isSoldOut = registeredCount >= capacity;
  const ratio = registeredCount / capacity;

  return (
    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="flex items-center gap-1 font-medium text-slate-500">
          <Users className="w-3 h-3" /> Capacity
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {registeredCount} / {capacity}
        </span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isSoldOut ? "bg-red-500" : ratio > 0.8 ? "bg-amber-500" : "bg-blue-600"
          }`}
          style={{ width: `${Math.min(100, ratio * 100)}%` }}
        />
      </div>
    </div>
  );
}
