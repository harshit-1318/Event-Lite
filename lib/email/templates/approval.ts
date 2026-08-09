interface EventStatusEmailProps {
  organizerName: string;
  eventTitle: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

export function renderEventStatusEmail({
  organizerName,
  eventTitle,
  status,
  reason,
}: EventStatusEmailProps): string {
  const isApproved = status === "APPROVED";
  const badgeColor = isApproved ? "#22c55e" : "#ef4444";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Event Proposal ${status} - ${eventTitle}</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #09090b; color: #fafafa; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px;">
          <h1 style="color: #6366f1; font-size: 22px; margin-bottom: 8px;">Event Status Update</h1>
          <p style="color: #a1a1aa; font-size: 15px;">Hello ${organizerName},</p>
          
          <div style="background: #27272a; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 12px 0; font-size: 16px;">
              Your event <strong>"${eventTitle}"</strong> has been:
              <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; background: ${badgeColor}22; color: ${badgeColor}; font-weight: bold;">
                ${status}
              </span>
            </p>
            ${reason ? `<p style="color: #d4d4d8; font-size: 14px; margin: 8px 0;"><strong>Remarks:</strong> ${reason}</p>` : ""}
          </div>

          <p style="font-size: 14px; color: #71717a;">You can manage your event details directly from your Faculty Portal.</p>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 24px 0;" />
          <p style="font-size: 12px; color: #52525b; text-align: center;">© EventElite. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}
