import { Role } from "@prisma/client";

/**
 * Pure check if user can manage/edit an event
 */
export function canManageEvent(
  user: { id: string; role: Role },
  event: { organizerId: string }
): boolean {
  if (user.role === Role.ADMIN) return true;
  if (user.role === Role.FACULTY && event.organizerId === user.id) return true;
  return false;
}

/**
 * Pure check if user can manage/view a registration
 */
export function canManageRegistration(
  user: { id: string; role: Role },
  registration: { userId: string; event?: { organizerId: string } }
): boolean {
  if (user.role === Role.ADMIN) return true;
  if (registration.userId === user.id) return true;
  if (user.role === Role.FACULTY && registration.event && registration.event.organizerId === user.id) {
    return true;
  }
  return false;
}
