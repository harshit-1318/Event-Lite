import { describe, it, expect } from "vitest";
import { renderRegistrationEmail } from "@/lib/email/templates/registration";
import { renderEventStatusEmail } from "@/lib/email/templates/approval";

describe("Email Templates Generator", () => {
  it("generates registration email containing user and ticket details", () => {
    const html = renderRegistrationEmail({
      userName: "Rahul Sharma",
      eventTitle: "National Tech Hackathon 2026",
      eventDate: "March 15, 2026",
      eventVenue: "Auditorium Hall A",
      ticketId: "TICKET-7890",
    });

    expect(html).toContain("Rahul Sharma");
    expect(html).toContain("National Tech Hackathon 2026");
    expect(html).toContain("TICKET-7890");
    expect(html).toContain("Auditorium Hall A");
  });

  it("generates event status approved email with positive styling", () => {
    const html = renderEventStatusEmail({
      organizerName: "Prof. Verma",
      eventTitle: "AI & ML Symposium",
      status: "APPROVED",
    });

    expect(html).toContain("Prof. Verma");
    expect(html).toContain("AI & ML Symposium");
    expect(html).toContain("APPROVED");
  });

  it("generates event status rejected email with reason remarks", () => {
    const html = renderEventStatusEmail({
      organizerName: "Prof. Verma",
      eventTitle: "Robotics Workshop",
      status: "REJECTED",
      reason: "Venue already booked for cultural fest.",
    });

    expect(html).toContain("REJECTED");
    expect(html).toContain("Venue already booked for cultural fest.");
  });
});
