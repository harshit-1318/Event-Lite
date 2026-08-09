"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface DashboardSidebarProps {
  title: string;
  links: SidebarLink[];
}

export function DashboardSidebar({ title, links }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="px-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </div>
              {link.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
