import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import ClientRSVPButton from "./ClientRSVPButton";

type Event = {
  name: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  image: string;
};

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={event.image}
            alt={event.name}
            className="w-full rounded-md"
          />
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
        <CardFooter className="flex justify-end">
          <ClientRSVPButton eventName={event.name} eventDate={event.date} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
