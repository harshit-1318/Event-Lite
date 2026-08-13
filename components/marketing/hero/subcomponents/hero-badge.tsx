import { Sparkles, ShieldCheck } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 border border-blue-500/30 text-xs font-bold text-blue-700 dark:text-blue-300 shadow-sm backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
      <span className="tracking-tight">DAV College Jalandhar • NAAC A+ Official Portal</span>
      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase">
        V2.0 LIVE
      </span>
    </div>
  );
}
