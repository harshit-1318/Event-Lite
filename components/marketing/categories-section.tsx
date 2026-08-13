import type { ReactNode } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight, Code2, Mic, Theater, Trophy, Building2, Sparkles, GraduationCap, Calendar, Compass } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  LaptopCode: <Code2 className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Theater: <Theater className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
};

export function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Discover by Interest
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Explore Categories</h2>
        </div>
        <Link
          href="/events"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group w-fit"
        >
          View all 8 categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/events?category=${cat.slug}`}
            className="group p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-200">
                {iconMap[cat.icon] || <Calendar className="w-5 h-5" />}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
