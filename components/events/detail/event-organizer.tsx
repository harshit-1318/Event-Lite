import { Mail } from "lucide-react";

interface EventOrganizerProps {
  organizer: {
    name: string;
    email: string;
    department?: string | null;
  };
}

export function EventOrganizer({ organizer }: EventOrganizerProps) {
  return (
    <div className="p-5 rounded-3xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Coordinator & Department</h4>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-blue-500/20">
            {organizer.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white">{organizer.name}</h5>
            <p className="text-[11px] text-slate-500">{organizer.department || "DAV Faculty"}</p>
          </div>
        </div>
        <a
          href={`mailto:${organizer.email}`}
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Mail className="w-3.5 h-3.5" /> Contact
        </a>
      </div>
    </div>
  );
}
