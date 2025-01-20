import { cache } from "react";
import { db } from "./db";
import { events, registrations } from "./db/schema";
import { eq, ne, or, isNull } from "drizzle-orm";
import { DatabaseError } from "@neondatabase/serverless";

export const getAllEvents = cache(async () => {
  try {
    const events: EventDetails[] = await db.query.events.findMany();
    return events;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DatabaseError) {
      throw new Error(error.hint);
    }
  }
});

export const getUnregisteredEvents = cache(async (userId: string) => {
  try {
    const unregisteredEvents = await db
      .select()
      .from(events)
      .leftJoin(registrations, eq(registrations.eventId, events.id))
      .where(or(ne(registrations.userId, userId), isNull(registrations)))
      .orderBy(events.id);

    const eventData: EventDetails[] = unregisteredEvents.map(
      (entry) => entry.event,
    );

    return eventData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DatabaseError) {
      throw new Error(error.hint);
    }
  }
});

export const getEventById = async (
  id: number,
): Promise<EventDetails | undefined> => {
  try {
    const response = await db.select().from(events).where(eq(events.id, id));

    if (response.length === 0) {
      throw new Error("No event found.");
    } else if (response[0]) {
      const selectedEvent: EventDetails = response[0];
      return selectedEvent;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DatabaseError) {
      throw new Error(error.hint);
    }
  }
};

export const getMyEvents = async (userId: string) => {
  try {
    const myEvents = await db
      .select({ event: events })
      .from(events)
      .rightJoin(registrations, eq(registrations.userId, userId))
      .where(eq(registrations.eventId, events.id));

    const eventData = myEvents.map((entry) => entry.event);

    return eventData as EventDetails[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DatabaseError) {
      throw new Error(error.hint);
    }
  }
};
