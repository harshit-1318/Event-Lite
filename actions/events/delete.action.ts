"use server";

import { prisma } from "@/lib/db/prisma";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { Role, EventStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteEventAction(eventId: string) {
  const user = await requireFacultyOrAdmin();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { success: false, message: "Event not found." };
  if (event.organizerId !== user.id && user.role !== Role.ADMIN) {
    return { success: false, message: "Unauthorized to modify this event." };
  }

  try {
    // Soft cancel event rather than raw destructive delete
    await prisma.event.update({
      where: { id: eventId },
      data: { status: EventStatus.CANCELLED },
    });

    revalidatePath("/events");
    revalidatePath("/dashboard/faculty");
    return { success: true, message: "Event marked as cancelled." };
  } catch (error) {
    return { success: false, message: "Failed to cancel event." };
  }
}
