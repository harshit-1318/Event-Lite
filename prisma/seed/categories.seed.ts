import { PrismaClient } from "@prisma/client";
import { CATEGORIES } from "../../lib/constants";

export async function seedCategories(prisma: PrismaClient) {
  const categoryMap = new Map<string, any>();

  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    });
    categoryMap.set(cat.slug, created);
  }

  console.log(`📁 Seeded ${CATEGORIES.length} categories.`);
  return categoryMap;
}
