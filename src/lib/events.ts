"use server";

import { auth } from "@clerk/nextjs/server";
import {
  getAllEvents,
  getMyEvents,
  getUnregisteredEvents,
} from "~/server/queries";

export const fetchEventsForUser = async () => {
  const user = await auth();

  if (!user.userId) {
    const eventsData: EventDetails[] | undefined = await getAllEvents();
    return eventsData;
  }

  const eventsData: EventDetails[] | undefined = await getUnregisteredEvents(
    user.userId,
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
