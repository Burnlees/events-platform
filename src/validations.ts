import { z } from "zod";

export const eventsFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(256),
  date: z.string().date().min(3).max(256),
  time: z.string().time().min(3).max(256),
  venue: z.string().min(3).max(256),
  city: z.string().min(3).max(256),
  country: z.string().min(3).max(256),
  image: z.string().url().min(3).max(256),
});

export const eventByIdSchema = z.object({
  id: z.number(),
});

export const deleteMultipleEventsSchema = z.array(z.number());
