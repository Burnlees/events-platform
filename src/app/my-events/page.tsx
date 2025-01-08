import { myEventsAction } from "~/actions";
import EventsList from "../_components/EventsList";

const MyEvents = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <EventsList getEvents={myEventsAction} />
      </div>
    </main>
  );
};

export default MyEvents;