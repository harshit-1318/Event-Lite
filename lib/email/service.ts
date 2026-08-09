import { resend, FROM_EMAIL } from "./client";
import { renderRegistrationEmail } from "./templates/registration";
import { renderEventStatusEmail } from "./templates/approval";

export async function sendRegistrationEmail(data: {
  to: string;
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  ticketId: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      console.log(`[Mock Email] Registration sent to ${data.to} for ${data.eventTitle}`);
      return { success: true };
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Registration Confirmed: ${data.eventTitle}`,
      html: renderRegistrationEmail(data),
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to send email";
    console.error("[Email Service Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

export async function sendEventStatusEmail(data: {
  to: string;
  organizerName: string;
  eventTitle: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      console.log(`[Mock Email] Event status ${data.status} sent to ${data.to}`);
      return { success: true };
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Event Status Update: ${data.eventTitle}`,
      html: renderEventStatusEmail(data),
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to send email";
    console.error("[Email Service Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
