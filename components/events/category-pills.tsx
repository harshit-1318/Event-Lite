import React from "react";

interface CategoryPillsProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  currentCategory: string;
  onSelect: (slug: string) => void;
}

export function CategoryPills({ categories, currentCategory, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
      <button
        onClick={() => onSelect("all")}
        className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
          currentCategory === "all" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            currentCategory === cat.slug ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
