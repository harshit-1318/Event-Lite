import { z } from "zod";
import { EventStatus } from "@prisma/client";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(200).optional(),
  venue: z.string().min(2, "Venue is required").max(100),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  time: z.string().min(1, "Event time is required (e.g. 10:00 AM)"),
  fee: z.number().min(0, "Fee must be 0 or positive"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  imageUrl: z.string().optional().or(z.literal("")),
  status: z.nativeEnum(EventStatus),
});

export type EventInput = z.infer<typeof eventSchema>;

export const directRegisterSchema = z.object({
  eventId: z.string().min(1, "Select an event"),
  emailOrRollNo: z.string().min(1, "Enter student email or roll number"),
});

export type DirectRegisterInput = z.infer<typeof directRegisterSchema>;
