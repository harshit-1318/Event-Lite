import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { canManageEvent, canManageRegistration } from "./rules";

export { canManageEvent, canManageRegistration };

/**
 * Get current session user on the server
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require any authenticated user or redirect to /login
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Require specific role or throw / redirect
 */
export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized: Insufficient permissions to access this resource.");
  }
  return user;
}

/**
 * Require ADMIN role
 */
export async function requireAdmin() {
  return requireRole([Role.ADMIN]);
}

/**
 * Require FACULTY or ADMIN role
 */
export async function requireFacultyOrAdmin() {
  return requireRole([Role.FACULTY, Role.ADMIN]);
}
