import React from "react";
import { Users, Trophy, CalendarCheck, Award, Sparkles } from "lucide-react";

interface HeroStatsProps {
  totalEventsCount: number;
  totalStudentsCount: number;
}

export function HeroStats({ totalEventsCount, totalStudentsCount }: HeroStatsProps) {
  const stats = [
    { label: "Campus Events", value: `${totalEventsCount}+`, icon: CalendarCheck, gradient: "from-blue-600 to-cyan-500" },
    { label: "Active Students", value: `${totalStudentsCount}+`, icon: Users, gradient: "from-indigo-600 to-purple-500" },
    { label: "Check-in Rate", value: "99.8%", icon: Trophy, gradient: "from-emerald-600 to-teal-500" },
    { label: "Years of Heritage", value: "106+", icon: Award, gradient: "from-amber-500 to-rose-500" },
  ];

  return (
    <div className="pt-4 space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 text-left transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-2xl sm:text-3xl font-black bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span>
          Instant QR Pass & verified certificates for all <strong className="text-slate-900 dark:text-white font-bold">DAV College Jalandhar</strong> students.
        </span>
      </div>
    </div>
  );
}
