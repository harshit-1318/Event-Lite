import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      department?: string | null;
      rollNo?: string | null;
      studentClass?: string | null;
      isActive: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    department?: string | null;
    rollNo?: string | null;
    studentClass?: string | null;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    department?: string | null;
    rollNo?: string | null;
    studentClass?: string | null;
    isActive: boolean;
  }
}
