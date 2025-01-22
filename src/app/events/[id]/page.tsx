import React from "react";
import { getEventById } from "~/server/queries";
import Image from "next/image";
import { Separator } from "~/components/ui/separator";
import ClientRSVPButton from "~/app/_components/ClientRSVPButton";
import AddToCalanderButton from "~/app/_components/AddToCalanderButton";
import BuyTicketsButton from "~/app/my-events/_components/BuyTicketsButton";
import EventPageSocialShare from "../_components/EventPageSocialShare";

const EventPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = Number((await params).id);
  const eventDetails = await getEventById(id);

  if (!eventDetails) return <div>No event found.</div>;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <section className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12">
          <Image
            src={eventDetails.image}
            alt={eventDetails.name}
            width={400}
            height={600}
            className="h-96 w-full rounded-md object-cover md:col-span-2"
          />
          <Separator className="md:col-span-2" />
          <div className="text-sm">
            <h1 className="mb-4 text-2xl font-semibold">{eventDetails.name}</h1>
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li>
                <span className="font-bold">Date</span>: {eventDetails.date}
              </li>
              <li>
                <span className="font-bold">Time</span>: {eventDetails.time}
              </li>
              <li className="col-span-2">
                <span className="font-bold">Venue</span>: {eventDetails.venue}
              </li>
              <li className="col-span-2">
                <span className="font-bold">City</span>: {eventDetails.city},{" "}
                {eventDetails.country}
              </li>
            </ul>
          </div>
          <div className="flex gap-4 justify-between md:ml-auto">
            <AddToCalanderButton eventDetails={eventDetails} />
            <BuyTicketsButton eventId={eventDetails.id} />
            <ClientRSVPButton eventId={eventDetails.id} />
          </div>
          <div className="col-span-2">
            <EventPageSocialShare eventId={eventDetails.id} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventPage;
