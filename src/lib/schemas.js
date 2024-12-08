import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  startDate: z.string().min(10).max(10, "Invalid date format"),
  endDate: z.string().min(10).max(10, "Invalid date format"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  thumbnail: z.string(),
  category: z.string().min(1, "Category is required"),
  lat: z.number(),
  long: z.number(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address is too long"),
});
