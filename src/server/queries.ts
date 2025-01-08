import { db } from "./db";
import { events, registrations } from "./db/schema";
import { eq } from "drizzle-orm";

export const getAllEvents = async () => {
  const events = await db.query.events.findMany();
  return events;
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
