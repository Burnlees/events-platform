import { currentUser } from "@clerk/nextjs/server";
import { getMyEvents } from "../server/queries";

export const filterRegisteredEvents = async (allEvents: EventDetails[]) => {
  const user = await currentUser();

  if (!user?.id) {
    return [...allEvents];
  }

  const registeredEvents = await getMyEvents(user.id);

  const registeredEventsIds = registeredEvents.map((event) => event.id);

  const unregisteredEvents = allEvents.filter(
    (event) => !registeredEventsIds.includes(event.id),
  );

  return unregisteredEvents;
};
