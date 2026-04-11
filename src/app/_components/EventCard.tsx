import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import ClientRSVPButton from "./ClientRSVPButton";
import AddToCalanderButton from "./AddToCalanderButton";
import Image from "next/image";
import SocialMedaShare from "./SocialMedaShare";
import Link from "next/link";

type EventCardProps = {
  event: EventDetails;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            <Link href={`events/${event.id}`}>{event.name}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={event.image}
            alt={event.name}
            width={400}
            height={600}
            className="h-44 w-full rounded-[16px] object-cover"
          />
          <div className="mt-4 text-base">
            <ul className="grid grid-cols-2 gap-4 text-base">
              <li>
                <span className="font-semibold">Date</span>: {event.date}
              </li>
              <li>
                <span className="font-semibold">Time</span>: {event.time}
              </li>
              <li className="col-span-2">
                <span className="font-semibold">Venue</span>: {event.venue}
              </li>
              <li className="col-span-2">
                <span className="font-semibold">City</span>: {event.city},{" "}
                {event.country}
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border py-4">
          <SocialMedaShare />
          <AddToCalanderButton eventDetails={event} />
          <ClientRSVPButton eventId={event.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
