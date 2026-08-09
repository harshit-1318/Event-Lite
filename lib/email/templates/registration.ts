interface RegistrationEmailProps {
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  ticketId: string;
}

export function renderRegistrationEmail({
  userName,
  eventTitle,
  eventDate,
  eventVenue,
  ticketId,
}: RegistrationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Registration Confirmed - ${eventTitle}</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #09090b; color: #fafafa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px;">
          <h1 style="color: #6366f1; font-size: 24px; margin-bottom: 8px;">EventElite Registration Confirmed! 🎉</h1>
          <p style="color: #a1a1aa; font-size: 15px;">Hi ${userName}, you are all set for your upcoming event.</p>
          
          <div style="background: #27272a; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h2 style="font-size: 18px; color: #f43f5e; margin-top: 0;">${eventTitle}</h2>
            <p style="margin: 6px 0; color: #d4d4d8;">📅 <strong>Date:</strong> ${eventDate}</p>
            <p style="margin: 6px 0; color: #d4d4d8;">📍 <strong>Venue:</strong> ${eventVenue}</p>
            <p style="margin: 6px 0; color: #a1a1aa; font-size: 13px;">🎟️ <strong>Ticket ID:</strong> <code style="color: #38bdf8;">${ticketId}</code></p>
          </div>

          <p style="font-size: 14px; color: #71717a;">Show your digital ticket or QR code at the registration desk for seamless check-in.</p>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 24px 0;" />
          <p style="font-size: 12px; color: #52525b; text-align: center;">© EventElite. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}
