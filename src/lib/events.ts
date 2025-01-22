"use server";

import { auth } from "@clerk/nextjs/server";
import {
  getAllEvents,
  getMyEvents,
  getPaginatedAllEvents,
  getPaginatedUnregisteredEvents,
} from "~/server/queries";

export const fetchEventsForUser = async (pageNumber: number) => {
  const user = await auth();

  if (!user.userId) {
    const eventsData = await getPaginatedAllEvents(pageNumber, 16);
    return eventsData;
  }

  const eventsData = await getPaginatedUnregisteredEvents(
    user.userId,
    pageNumber,
    16,
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
