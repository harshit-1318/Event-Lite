"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, TrendingUp } from "lucide-react";

const QUICK_TAGS = [
  { label: "⚡ Hackathons", slug: "workshops-bootcamps" },
  { label: "🎭 Cultural Fest", slug: "cultural-festivals" },
  { label: "🏆 Sports Meet", slug: "sports-tournaments" },
  { label: "🤖 AI Bootcamp", slug: "workshops-bootcamps" },
];

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/events?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/events");
    }
  };

  return (
    <div className="w-full space-y-2.5 pt-1">
      <form onSubmit={handleSearch} className="relative flex items-center group">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hackathons, bootcamps, cultural fests, sports..."
          className="w-full h-12 pl-10 pr-24 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600/50 shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
          <TrendingUp className="w-3 h-3 text-amber-500" /> Hot:
        </span>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag.slug + tag.label}
            type="button"
            onClick={() => router.push(`/events?category=${tag.slug}`)}
            className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all cursor-pointer"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
