import { sendRegistrationEmail, sendEventStatusEmail } from "./service";

export async function dispatchRegistrationConfirmation(data: {
  email: string;
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  ticketId: string;
}) {
  try {
    await sendRegistrationEmail({
      to: data.email,
      userName: data.userName,
      eventTitle: data.eventTitle,
      eventDate: data.eventDate,
      eventVenue: data.eventVenue,
      ticketId: data.ticketId,
    });
  } catch (err) {
    console.error("[Dispatch Email Error]:", err);
  }
}

export async function dispatchEventApprovalStatus(data: {
  email: string;
  organizerName: string;
  eventTitle: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}) {
  try {
    await sendEventStatusEmail({
      to: data.email,
      organizerName: data.organizerName,
      eventTitle: data.eventTitle,
      status: data.status,
      reason: data.reason,
    });
  } catch (err) {
    console.error("[Dispatch Status Email Error]:", err);
  }
}
