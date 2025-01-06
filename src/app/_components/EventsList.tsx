import React from "react";
import EventCard from "./EventCard";
import { db } from "~/server/db";

const EventsList = async () => {
  const events = await db.query.events.findMany();

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {events.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventsList;
