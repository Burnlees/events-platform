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
import { AspectRatio } from "~/components/ui/aspect-ratio";

type EventCardProps = {
  event: EventDetails;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={event.image}
              alt={event.name}
              width={400}
              height={600}
              className="h-44 w-full rounded-md object-cover"
            />
          </AspectRatio>
          <div className="mt-4 text-sm">
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <span className="font-bold">Date</span>: {event.date}
              </li>
              <li>Time: {event.time}</li>
              <li className="col-span-2">Venue: {event.venue}</li>
              <li className="col-span-2">
                City: {event.city}, {event.country}
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AddToCalanderButton eventDetails={event} />
          <ClientRSVPButton eventId={event.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
