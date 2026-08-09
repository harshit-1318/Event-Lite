"use client";

import React, { useState, useTransition } from "react";
import { createCategoryAction, deleteCategoryAction } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Tag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryManagerProps {
  categories: Array<{ id: string; name: string; slug: string; _count: { events: number } }>;
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createCategoryAction({ name, description });
      if (res.success) {
        toast.success(res.message);
        setName("");
        setDescription("");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    startTransition(async () => {
      const res = await deleteCategoryAction(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <Input placeholder="New Category Name (e.g. Robotics)" value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} className="h-10 text-xs flex-1" />
        <Input placeholder="Short Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} className="h-10 text-xs flex-1" />
        <Button type="submit" disabled={isPending || !name} className="h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold px-4">
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Plus className="w-3.5 h-3.5 mr-1" /> Add Category</>}
        </Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-blue-500" /> {c.name}</span>
              <p className="text-[10px] text-slate-400 font-mono">{c._count.events} events linked</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => handleDelete(c.id)} disabled={isPending} className="text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-lg">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
