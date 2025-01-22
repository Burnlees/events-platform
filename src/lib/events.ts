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

  if (!user.userId) {
    const eventsData = await getPaginatedAllEvents(
      pageNumber,
      16,
      orderBy,
      sortBy,
    );
    return eventsData;
  }

  const eventsData = await getPaginatedUnregisteredEvents(
    user.userId,
    pageNumber,
    16,
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
