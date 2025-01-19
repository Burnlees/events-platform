import React from "react";
import EventCard from "./EventCard";

type EventsListProps = {
  getEvents: () => Promise<EventDetails[] | undefined>;
};

const EventsList = async ({ getEvents }: EventsListProps) => {
  const events = await getEvents();

  if (!events) return <div>No events found.</div>;

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {events.map((event: EventDetails) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
