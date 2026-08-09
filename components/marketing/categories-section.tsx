import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { ArrowRight, Code2, Mic, Theater, Trophy, Building2, Sparkles, GraduationCap, Calendar } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
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
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Browse by Interest</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Event Categories</h2>
        </div>
        <Link href="/events" className="text-xs font-semibold text-blue-600 hover:underline">
          View all &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/events?category=${cat.slug}`}
            className="group p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                {iconMap[cat.icon] || <Calendar className="w-5 h-5" />}
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{cat.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
