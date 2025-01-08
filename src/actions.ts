"use server";

import "server-only";
import { postRegistration } from "./server/mutations";
import { auth } from "@clerk/nextjs/server";
import { getAllEvents, getMyEvents } from "./server/queries";

export const allEventsAction = async () => {
  try {
    const response = getAllEvents();
    return response;
  } catch (error) {}
};

export const myEventsAction = async () => {
  try {
    const user = await auth();

    if (!user.userId) {
      throw new Error("Unauthorized: User is not authenticated.");
    }

    const response = getMyEvents(user.userId);
    return response;
  } catch (error) {}
};

export const registerEventAction = async (eventId: number) => {
  try {
    const user = await auth();

    if (!user.userId) {
      throw new Error("Unauthorized: User is not authenticated.");
    }

    const event = await postRegistration(user.userId, eventId);

    return {
      success: true,
      message: `Successfully registered for event '${event?.name}' on '${event?.date}'.`,
      eventId: event?.id,
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(error.message || "An unexpected error occurred.");
  }
};
