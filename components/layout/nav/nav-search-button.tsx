import Link from "next/link";
import { Search } from "lucide-react";

export function NavSearchButton() {
  return (
    <Link
      href="/events"
      className="hidden lg:flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 px-3.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 transition-all group"
    >
      <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
      <span className="font-medium">Quick search...</span>
      <kbd className="text-[10px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-md text-slate-400 shadow-2xs">
        ⌘K
      </kbd>
    </Link>
  );
}
