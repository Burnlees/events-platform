"use server";

import "server-only";
import { postRegistration } from "./server/mutations";
import { auth } from "@clerk/nextjs/server";
import { getAllEvents, getMyEvents } from "./server/queries";
import { ac } from "./lib/safe-action";
import { getGoogleAccessToken } from "./lib/AccessToken";
import { google } from "googleapis";
import { addToCalendarSchema, eventByIdSchema } from "./validations";
import { checkIfEventExists } from "./lib/check-if-event-exists";
import { filterRegisteredEvents } from "./lib/filter-registered-events";

export const allEventsAction = async (): Promise<
  EventDetails[] | undefined
> => {
  try {
    const events = await getAllEvents();
    if (events) {
      const unregisteredEvents = await filterRegisteredEvents(events);
      return unregisteredEvents.filter((event: EventDetails) => event !== null);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const myEventsAction = async (): Promise<EventDetails[] | undefined> => {
  try {
    const user = await auth();

    if (!user.userId) {
      throw new Error("Unauthorized: User is not authenticated.");
    }

    const events = await getMyEvents(user.userId);
    if (events) {
      return events.filter((event: EventDetails) => event !== null);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const registerEventAction = ac
  .schema(eventByIdSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const user = await auth();

    if (!user.userId) {
      throw new Error("Unauthorized: User is not authenticated.");
    }

    const event = await postRegistration(user.userId, id);

    return {
      success: true,
      eventDetails: event,
    };
  });

export const AddToCalanderAction = ac
  .schema(addToCalendarSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { id, name, date, time, venue, city } = parsedInput;
      const token = await getGoogleAccessToken();

      if (!token) {
        throw new Error("Failed to retrieve Google access token.");
      }

      const auth = new google.auth.OAuth2();
      auth.setCredentials({
        access_token: token,
      });
      const calendar = google.calendar({ version: "v3" });

      const eventExists = await checkIfEventExists(id, calendar, auth);

      if (eventExists) {
        throw new Error("Event already exists in the calendar.");
      }

      const startTime = new Date(`${date}T${time}Z`);
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

      const event = {
        id: `nuid${id}`,
        summary: name,
        description: `This event duration is estimated to be 2 hours. Please check with venue for more details.`,
        location: `${venue}, ${city}`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: "Europe/London",
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: "Europe/London",
        },
      };

      const response = await calendar.events.insert({
        auth,
        calendarId: "primary",
        requestBody: event,
      });

      console.log("Event created: %s", response.data.htmlLink);
      return response.data;
    } catch (error: unknown) {
      console.error("Error adding event to Google Calendar:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });
