import { db } from "./db";
import { registrations } from "./db/schema";

export const postRegistration = async (userId: string, eventId: number) => {
  try {
    const event = await db.query.events.findFirst({
      where: (model, { eq }) => eq(model.id, eventId),
    });

    console.log(event);

    if (!event) {
      throw new Error(`Event not found.`);
    }

    await db.insert(registrations).values({
      eventId: event.id,
      userId,
    });

    return event;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "23505") {
        throw new Error("You are already registered for this event.");
      }
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};
