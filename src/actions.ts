"use server";

import "server-only";
import { postRegistration } from "./server/mutations";
import { auth } from "@clerk/nextjs/server";

export const registerForEvent = async (
  eventName: string,
  eventDate: string,
) => {
  try {
    const user = await auth();

    if (!user.userId) {
      throw new Error("Unauthorized: User is not authenticated.");
    }

    const event = await postRegistration(user.userId, eventName, eventDate);

    return {
      success: true,
      message: `Successfully registered for event '${event.name}' on '${event.date}'.`,
      eventId: event.id,
    };
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
