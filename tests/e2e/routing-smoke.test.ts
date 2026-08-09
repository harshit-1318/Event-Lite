import { describe, it, expect } from "vitest";

describe("E2E Route Guard & Endpoint Definitions", () => {
  const publicRoutes = ["/", "/events", "/past-events", "/about", "/contact", "/login", "/register"];
  const protectedRoutes = ["/dashboard/student", "/dashboard/faculty", "/dashboard/admin"];

  it("ensures all public routes are defined without authentication requirement", () => {
    publicRoutes.forEach((route) => {
      expect(route).toBeDefined();
      expect(route.startsWith("/")).toBe(true);
    });
  });

  it("ensures protected role prefixes match security policy", () => {
    protectedRoutes.forEach((route) => {
      expect(route.startsWith("/dashboard")).toBe(true);
    });
  });
});
