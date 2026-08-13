"use server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/permissions/rbac";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(data: { name: string; description?: string }) {
  await requireAdmin();

  if (!data.name || data.name.trim().length < 2) {
    return { success: false, message: "Category name must be at least 2 characters." };
  }

  try {
    const slug = slugify(data.name);
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) return { success: false, message: "A category with this name already exists." };

    const category = await prisma.category.create({
      data: {
        name: data.name.trim(),
        slug,
        description: data.description?.trim() || null,
      },
    });

    revalidatePath("/dashboard/admin/categories");
    revalidatePath("/events");
    return { success: true, message: "Category created successfully!", data: category };
  } catch (error) {
    return { success: false, message: "Failed to create category." };
  }
}

export async function deleteCategoryAction(categoryId: string) {
  await requireAdmin();

  try {
    const eventsCount = await prisma.event.count({ where: { categoryId } });
    if (eventsCount > 0) {
      return { success: false, message: `Cannot delete category with ${eventsCount} associated events.` };
    }

    await prisma.category.delete({ where: { id: categoryId } });

    revalidatePath("/dashboard/admin/categories");
    revalidatePath("/events");
    return { success: true, message: "Category deleted." };
  } catch (error) {
    return { success: false, message: "Failed to delete category." };
  }
}
