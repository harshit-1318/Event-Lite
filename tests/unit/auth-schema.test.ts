import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, forgotPasswordSchema } from "@/lib/validations/auth.schema";

describe("Authentication Validation Schemas", () => {
  it("validates correct login credentials", () => {
    const res = loginSchema.safeParse({
      email: "student@eventelite.com",
      password: "Password123!",
    });
    expect(res.success).toBe(true);
  });

  it("rejects invalid email formats", () => {
    const res = loginSchema.safeParse({
      email: "not-an-email",
      password: "Password123!",
    });
    expect(res.success).toBe(false);
  });

  it("validates full student registration fields", () => {
    const res = registerSchema.safeParse({
      name: "Aarav Sharma",
      email: "aarav@eventelite.com",
      password: "Password@123",
      confirmPassword: "Password@123",
      rollNo: "2024-CS-099",
      studentClass: "B.Tech CSE 6th Sem",
      department: "Computer Science",
    });
    expect(res.success).toBe(true);
  });

  it("rejects mismatched passwords during registration", () => {
    const res = registerSchema.safeParse({
      name: "Aarav Sharma",
      email: "aarav@eventelite.com",
      password: "Password@123",
      confirmPassword: "DifferentPassword@123",
      rollNo: "2024-CS-099",
      studentClass: "B.Tech CSE 6th Sem",
    });
    expect(res.success).toBe(false);
  });
});
