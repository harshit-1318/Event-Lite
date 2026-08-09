import { describe, it, expect } from "vitest";
import { canManageEvent, canManageRegistration } from "@/lib/permissions/rules";
import { Role } from "@prisma/client";

describe("RBAC Permission Helpers", () => {
  const adminUser = { id: "admin-1", role: Role.ADMIN };
  const facultyUser1 = { id: "fac-1", role: Role.FACULTY };
  const facultyUser2 = { id: "fac-2", role: Role.FACULTY };
  const studentUser = { id: "stud-1", role: Role.STUDENT };

  const eventCreatedByFaculty1 = { organizerId: "fac-1" };

  describe("canManageEvent", () => {
    it("allows ADMIN to manage any event", () => {
      expect(canManageEvent(adminUser, eventCreatedByFaculty1)).toBe(true);
    });

    it("allows owner FACULTY to manage their own event", () => {
      expect(canManageEvent(facultyUser1, eventCreatedByFaculty1)).toBe(true);
    });

    it("prevents non-owner FACULTY from managing another organizer's event", () => {
      expect(canManageEvent(facultyUser2, eventCreatedByFaculty1)).toBe(false);
    });

    it("prevents STUDENT from managing any event", () => {
      expect(canManageEvent(studentUser, eventCreatedByFaculty1)).toBe(false);
    });
  });

  describe("canManageRegistration", () => {
    const regStudent1 = {
      userId: "stud-1",
      event: { organizerId: "fac-1" },
    };

    it("allows ADMIN to manage any registration", () => {
      expect(canManageRegistration(adminUser, regStudent1)).toBe(true);
    });

    it("allows the student who registered to manage their ticket", () => {
      expect(canManageRegistration(studentUser, regStudent1)).toBe(true);
    });

    it("allows event organizer to manage attendee registration", () => {
      expect(canManageRegistration(facultyUser1, regStudent1)).toBe(true);
    });

    it("prevents other faculty from managing third-party registration", () => {
      expect(canManageRegistration(facultyUser2, regStudent1)).toBe(false);
    });
  });
});
