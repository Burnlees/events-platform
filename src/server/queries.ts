import { db } from "./db";
import { events, registrations } from "./db/schema";
import { eq } from "drizzle-orm";

export const getAllEvents = async () => {
  const events = await db.query.events.findMany();
  return events;
};

export const getEventById = async (id: number) => {
  try {
    const response = await db.select().from(events).where(eq(events.id, id));

    if (response.length === 0) {
      throw new Error("No event found.");
    }
    if (response[0]) {
      const selectedEvent: EventDetails = response[0];
      return selectedEvent;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getMyEvents = async (userId: string) => {
  const myEvents = await db
    .select({ event: events })
    .from(events)
    .rightJoin(registrations, eq(registrations.userId, userId))
    .where(eq(registrations.eventId, events.id));

  const eventData = myEvents.map((entry) => entry.event);

  return eventData;
};
