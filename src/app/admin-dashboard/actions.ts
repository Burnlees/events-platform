"use server";

import { eq, inArray } from "drizzle-orm";
import { ac } from "~/lib/safe-action";
import { db } from "~/server/db";
import { events } from "~/server/db/schema";
import {
  createEventSchema,
  deleteEventSchema,
  deleteMultipleEventsSchema,
} from "~/validations";

export const createEventAction = ac
  .schema(createEventSchema)
  .action(async ({ parsedInput }) => {
    await db.insert(events).values({
      name: parsedInput.name,
      date: parsedInput.date,
      time: parsedInput.time,
      venue: parsedInput.venue,
      city: parsedInput.city,
      country: parsedInput.country,
      image: parsedInput.image,
    });

    return {
      name: parsedInput.name,
    };
  });

export const deleteEventAction = ac
  .schema(deleteEventSchema)
  .action(async ({ parsedInput }) => {
    const deletedEvent = await db
      .delete(events)
      .where(eq(events.id, parsedInput.id))
      .returning();
    return {
      success: true,
      eventDetails: deletedEvent,
    };
  });

export const deleteMultipleEventsAction = ac
  .schema(deleteMultipleEventsSchema)
  .action(async ({ parsedInput }) => {
    const deletedEvents = await db
      .delete(events)
      .where(inArray(events.id, parsedInput))
      .returning();

    return {
      success: true,
      eventDetails: deletedEvents,
      numberOfDeletedEvents: deletedEvents.length,
    };
  });
