import React from "react";
import EventCard from "./EventCard";

type EventsListProps = {
  events: EventDetails[] | undefined;
};

const EventsList = async ({ events }: EventsListProps) => {
  if (!events) return <div>No events found.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event: EventDetails) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
