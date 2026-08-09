"use server";

import { prisma } from "@/lib/db/prisma";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { eventSchema, type EventInput } from "@/lib/validations/event.schema";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateEventAction(eventId: string, data: EventInput) {
  const user = await requireFacultyOrAdmin();

  const validated = eventSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors, message: "Validation error." };
  }

  const existing = await prisma.event.findUnique({ where: { id: eventId } });
  if (!existing) return { success: false, message: "Event not found." };
  if (existing.organizerId !== user.id && user.role !== Role.ADMIN) {
    return { success: false, message: "Unauthorized to edit this event." };
  }

  const { title, categoryId, description, shortDescription, venue, startDate, endDate, time, fee, capacity, imageUrl, status } = validated.data;

  try {
    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        categoryId,
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

    revalidatePath(`/events/${updated.slug}`);
    revalidatePath("/events");
    revalidatePath("/dashboard/faculty");
    return { success: true, message: "Event updated successfully!", data: updated };
  } catch (error) {
    return { success: false, message: "Failed to update event." };
  }
}
