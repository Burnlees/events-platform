import { cache } from "react";
import { db } from "./db";
import { events, registrations } from "./db/schema";
import { eq, isNull, count, and } from "drizzle-orm";
import { DatabaseError } from "@neondatabase/serverless";
import { getOrderByClause } from "~/lib/getOrderByClause";

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

export const getPaginatedAllEvents = cache(
  async (
    page: number,
    limit: number,
    orderBy: string | undefined,
    sortBy: string | undefined,
  ) => {
    try {
      const offset = (page - 1) * limit;
      const orderByClause = getOrderByClause(sortBy, orderBy);

      const getTotalCountQuery = () =>
        db.select({ count: count() }).from(events);

      const getPaginatedEventsQuery = () =>
        db.query.events.findMany({
          orderBy: orderByClause,
          limit,
          offset,
        });

      const [totalCountQueryResult, eventsQueryResult] = await Promise.all([
        getTotalCountQuery(),
        getPaginatedEventsQuery(),
      ]);

      if (!totalCountQueryResult[0]) {
        throw new Error("No events found.");
      }

      const totalCount = totalCountQueryResult[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        events: eventsQueryResult,
        totalPages,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof DatabaseError) {
        throw new Error(error.hint);
      }
    }
  },
);

export const getUnregisteredEvents = cache(async (userId: string) => {
  try {
    const unregisteredEvents = await db
      .select()
      .from(events)
      .leftJoin(
        registrations,
        and(
          eq(registrations.eventId, events.id),
          eq(registrations.userId, userId),
        ),
      )
      .where(isNull(registrations))
      .orderBy(events.id);

    const eventsData: EventDetails[] = unregisteredEvents.map(
      (entry) => entry.event,
    );

    return eventsData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (error instanceof DatabaseError) {
      throw new Error(error.hint);
    }
  }
});

export const getPaginatedUnregisteredEvents = cache(
  async (
    userId: string,
    page: number,
    limit: number,
    orderBy: string | undefined,
    sortBy: string | undefined,
  ) => {
    try {
      const offset = (page - 1) * limit;
      const orderByClause = getOrderByClause(sortBy, orderBy);

      const getTotalCountQuery = () =>
        db
          .select({ count: count() })
          .from(events)
          .leftJoin(
            registrations,
            and(
              eq(registrations.eventId, events.id),
              eq(registrations.userId, userId),
            ),
          )
          .where(isNull(registrations));

      const getUnregisteredEventsQuery = () =>
        db
          .select()
          .from(events)
          .leftJoin(
            registrations,
            and(
              eq(registrations.eventId, events.id),
              eq(registrations.userId, userId),
            ),
          )
          .where(isNull(registrations))
          .orderBy(orderByClause)
          .limit(limit)
          .offset(offset);

      const [totalCountQueryResult, unregisteredEventsQueryResult] =
        await Promise.all([getTotalCountQuery(), getUnregisteredEventsQuery()]);

      if (!totalCountQueryResult[0]) {
        throw new Error("No events found.");
      }

      const totalCount = totalCountQueryResult[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      const eventsData: EventDetails[] = unregisteredEventsQueryResult.map(
        (entry) => entry.event,
      );

      return {
        events: eventsData,
        totalPages,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof DatabaseError) {
        throw new Error(error.hint);
      }
    }
  },
);

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
