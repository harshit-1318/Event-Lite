"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryPills } from "./subcomponents/category-pills";
import { Search, X } from "lucide-react";

interface EventFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

export function EventFilters({ categories }: EventFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentFee = searchParams.get("fee") || "all";
  const currentSort = searchParams.get("sort") || "upcoming";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const hasFilters = currentSearch !== "" || currentCategory !== "all" || currentFee !== "all" || currentSort !== "upcoming";

  return (
    <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
      <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search events by title, venue..."
            defaultValue={currentSearch}
            onChange={(e) => updateParam("search", e.target.value)}
            className="pl-9 h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={currentCategory} onValueChange={(val) => updateParam("category", val)}>
            <SelectTrigger className="w-35 h-10 text-xs bg-slate-50"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (<SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>))}
            </SelectContent>
          </Select>

          <Select value={currentFee} onValueChange={(val) => updateParam("fee", val)}>
            <SelectTrigger className="w-27.5 h-10 text-xs bg-slate-50"><SelectValue placeholder="Fee" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="free">Free</SelectItem><SelectItem value="paid">Paid</SelectItem></SelectContent>
          </Select>

          <Select value={currentSort} onValueChange={(val) => updateParam("sort", val)}>
            <SelectTrigger className="w-32.5 h-10 text-xs bg-slate-50"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent><SelectItem value="upcoming">Upcoming</SelectItem><SelectItem value="latest">Latest</SelectItem><SelectItem value="title">A-Z</SelectItem></SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={() => startTransition(() => router.push(pathname))} className="text-xs text-red-500 h-10 px-2.5">
              <X className="w-3.5 h-3.5 mr-1" /> Reset
            </Button>
          )}
        </div>
      </div>
      <CategoryPills categories={categories} currentCategory={currentCategory} onSelect={(slug) => updateParam("category", slug)} />
    </div>
  );
}
