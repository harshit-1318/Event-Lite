import { describe, it, expect } from "vitest";
import { eventSchema } from "@/lib/validations/event.schema";
import { EventStatus } from "@prisma/client";

describe("Event Validation Schema", () => {
  it("validates valid event creation inputs", () => {
    const res = eventSchema.safeParse({
      title: "AI & Web3 Hackathon 2026",
      categoryId: "cat-123",
      description: "Comprehensive 48-hour collegiate hackathon with mentors and prizes.",
      venue: "Auditorium 1",
      startDate: "2026-09-15",
      endDate: "2026-09-17",
      time: "09:00 AM – 06:00 PM",
      fee: 250,
      capacity: 150,
      status: EventStatus.PUBLISHED,
    });
    expect(res.success).toBe(true);
  });

  it("rejects negative capacity or fees", () => {
    const res = eventSchema.safeParse({
      title: "Test Event",
      categoryId: "cat-123",
      description: "Short description.",
      venue: "Main Hall",
      startDate: "2026-09-15",
      endDate: "2026-09-17",
      time: "10:00 AM",
      fee: -50,
      capacity: 0,
      status: EventStatus.PUBLISHED,
    });
    expect(res.success).toBe(false);
  });
});
