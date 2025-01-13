"use server";

import { eq, inArray } from "drizzle-orm";
import { ac } from "~/lib/safe-action";
import { db } from "~/server/db";
import { events } from "~/server/db/schema";
import {
  eventsFormSchema,
  eventByIdSchema,
  deleteMultipleEventsSchema,
} from "~/validations";

export const createEventAction = ac
  .schema(eventsFormSchema)
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

export const editEventAction = ac
  .schema(eventsFormSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    if (!id) {
      throw new Error(`No ID present in request.`);
    }

    const response = await db
      .update(events)
      .set(parsedInput)
      .where(eq(events.id, id))
      .returning();

    if (response.length === 0) {
      throw new Error(`Event with ID ${id} not found.`);
    }

    const updatedEvent = response[0] as EventDetails;

    console.log(updatedEvent);

    return {
      success: true,
      eventDetails: updatedEvent,
    };
  });

export const deleteEventAction = ac
  .schema(eventByIdSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    const response = await db
      .delete(events)
      .where(eq(events.id, id))
      .returning();

    if (response.length === 0) {
      throw new Error(`Event with ID ${id} not found.`);
    }

    const deletedEvent = response[0] as EventDetails;

    return {
      success: true,
      eventDetails: deletedEvent,
    };
  });

export const deleteMultipleEventsAction = ac
  .schema(deleteMultipleEventsSchema)
  .action(async ({ parsedInput }) => {
    const response = await db
      .delete(events)
      .where(inArray(events.id, parsedInput))
      .returning();

    if (response.length === 0) {
      throw new Error(`Events not found.`);
    }

    const deletedEvents = response as EventDetails[];

    return {
      success: true,
      eventDetails: deletedEvents,
      numberOfDeletedEvents: deletedEvents.length,
    };
  });
