import React from "react";
import { LucideIcon } from "lucide-react";

interface HowItWorksCardProps {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  badge: string;
}

export function HowItWorksCard({ step, title, description, icon: Icon, color, badge }: HowItWorksCardProps) {
  return (
    <div className="relative p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-slate-700">
            {badge}
          </span>
          <span className="text-2xl font-black text-slate-300 dark:text-slate-700 select-none">
            {step}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-left">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
