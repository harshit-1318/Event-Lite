import { PrismaClient, EventStatus } from "@prisma/client";
import { INITIAL_EVENTS } from "./events-data.seed";

export async function seedEvents(
  prisma: PrismaClient,
  faculty: any,
  categoryMap: Map<string, any>
) {
  const createdEvents = [];

  for (const ev of INITIAL_EVENTS) {
    const category =
      categoryMap.get(ev.categorySlug) ||
      Array.from(categoryMap.values())[0];

    const created = await prisma.event.create({
      data: {
        title: ev.title,
        slug: ev.slug,
        categoryId: category.id,
        organizerId: faculty.id,
        description: ev.description,
        shortDescription: ev.shortDescription,
        venue: ev.venue,
        startDate: ev.startDate,
        endDate: ev.endDate,
        time: ev.time,
        fee: ev.fee,
        capacity: ev.capacity,
        imageUrl: ev.imageUrl,
        status: ev.status as EventStatus,
      },
    });
    createdEvents.push(created);
  }

  console.log(`🎉 Seeded ${createdEvents.length} events (upcoming & completed).`);
  return createdEvents;
}
