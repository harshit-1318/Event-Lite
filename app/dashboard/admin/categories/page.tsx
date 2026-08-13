import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { CategoryManager } from "@/components/dashboard/admin";
import { Tags } from "lucide-react";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    include: { _count: { select: { events: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold">
          <Tags className="w-3.5 h-3.5" /> Taxonomy Management
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Event Categories</h1>
        <p className="text-xs text-slate-500">Create new event tracks and manage categories.</p>
      </div>

      <CategoryManager categories={categories} />
    </div>
  );
}
