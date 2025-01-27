"use server";

import { auth } from "@clerk/nextjs/server";
import {
  getMyEvents,
  getPaginatedAllEvents,
  getPaginatedUnregisteredEvents,
} from "~/server/queries";

export const fetchEventsForUser = async (
  pageNumber: number,
  orderBy: string | undefined,
  sortBy: string | undefined,
) => {
  const user = await auth();
  const limit = 16;

  if (!user.userId) {
    const eventsData = await getPaginatedAllEvents(
      pageNumber,
      limit,
      orderBy,
      sortBy,
    );
    return eventsData;
  }

  const eventsData = await getPaginatedUnregisteredEvents(
    user.userId,
    pageNumber,
    limit,
    orderBy,
    sortBy,
  );

  return eventsData;
};

export const fetchRegisteredEvents = async () => {
  const user = await auth();

  if (!user.userId) {
    return undefined;
  }

  const registeredEventsData: EventDetails[] | undefined = await getMyEvents(
    user.userId,
  );

  return registeredEventsData;
};
