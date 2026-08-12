import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 group-hover:shadow-blue-500/50 transition-all duration-300">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Event<span className="text-blue-600">Elite</span>
          </span>
          <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] font-black uppercase tracking-wider">
            V2
          </span>
        </div>
      </div>
    </Link>
  );
}
