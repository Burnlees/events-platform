import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AddToCalanderButton from "../../_components/AddToCalanderButton";
import Image from "next/image";
import BuyTicketsButton from "./BuyTicketsButton";
import SocialMedaShare from "~/app/_components/SocialMedaShare";
import Link from "next/link";

type EventCardProps = {
  event: EventDetails;
};

const MyEventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm">
            <Link href={`events/${event.id}`}>{event.name}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
            <Image
              src={event.image}
              alt={event.name}
              width={400}
              height={600}
              className="h-44 w-full rounded-md object-cover"
            />
          <div className="mt-4 text-sm">
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li>
                <span className="font-bold">Date</span>: {event.date}
              </li>
              <li>
                <span className="font-bold">Time</span>: {event.time}
              </li>
              <li className="col-span-2">
                <span className="font-bold">Venue</span>: {event.venue}
              </li>
              <li className="col-span-2">
                <span className="font-bold">City</span>: {event.city},{" "}
                {event.country}
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t-[1px] py-4">
          <SocialMedaShare />
          <AddToCalanderButton eventDetails={event} />
          <BuyTicketsButton eventId={event.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyEventCard;
