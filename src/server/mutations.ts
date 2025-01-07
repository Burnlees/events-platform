import { db } from "./db";
import { registrations } from "./db/schema";

export const postRegistration = async (
  userId: string,
  eventName: string,
  eventDate: string,
) => {
  try {
    const event = await db.query.events.findFirst({
      where: (model, { eq }) =>
        eq(model.name, eventName) && eq(model.date, eventDate),
    });

    if (!event) {
      throw new Error(
        `Event not found: No event matches name '${eventName}' and date '${eventDate}'.`,
      );
    }

    await db
      .insert(registrations)
      .values({
        eventId: event.id,
        userId,
      })
      .catch((err) => {
        if (err.code === "23505") {
          throw new Error("Already registered.");
        }
      });

    return event;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
