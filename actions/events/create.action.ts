"use server";

import { prisma } from "@/lib/db/prisma";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { eventSchema, type EventInput } from "@/lib/validations/event.schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createEventAction(data: EventInput) {
  const user = await requireFacultyOrAdmin();

  const validated = eventSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors, message: "Validation error." };
  }

  const { title, categoryId, description, shortDescription, venue, startDate, endDate, time, fee, capacity, imageUrl, status } = validated.data;

  try {
    let slug = slugify(title);
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-4)}`;

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        categoryId,
        organizerId: user.id,
        description,
        shortDescription: shortDescription || null,
        venue,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        time,
        fee,
        capacity,
        imageUrl: imageUrl || null,
        status,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "EVENT_CREATE",
        entity: "EVENT",
        entityId: event.id,
        details: { title: event.title, fee: event.fee },
      },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/faculty");
    return { success: true, message: "Event published successfully!", data: event };
  } catch (error) {
    return { success: false, message: "Failed to create event." };
  }
}
