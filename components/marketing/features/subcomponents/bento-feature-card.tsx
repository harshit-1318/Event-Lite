import { LucideIcon } from "lucide-react";

interface BentoFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  gradient: string;
  cols: string;
  highlight: string;
}

export function BentoFeatureCard({
  title,
  description,
  icon: Icon,
  badge,
  gradient,
  cols,
  highlight,
}: BentoFeatureCardProps) {
  return (
    <div
      className={`relative p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group ${cols}`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black tracking-wider uppercase border border-blue-200 dark:border-blue-800/80">
            {badge}
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/60">
            {highlight}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 text-left">
        <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
