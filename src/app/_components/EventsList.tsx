import React from "react";
import EventCard from "./EventCard";

type EventsListProps = {
  getEvents: () => Promise<any>;
};

const EventsList = async ({ getEvents }: EventsListProps) => {
  const events = await getEvents();

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {events.map((event: EventDetails) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
