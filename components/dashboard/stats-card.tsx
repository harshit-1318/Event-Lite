import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass = "text-blue-600 bg-blue-50 dark:bg-blue-900/30",
}: StatsCardProps) {
  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-slate-500">{title}</span>
        <div className="text-2xl font-black text-slate-900 dark:text-white">{value}</div>
        {subtitle && <p className="text-[10px] text-slate-400">{subtitle}</p>}
      </div>
      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0", colorClass)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
