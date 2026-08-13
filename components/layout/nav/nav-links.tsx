"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive
                ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            }`}
          >
            {link.name}
            {link.name === "Flashback" && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                New
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
