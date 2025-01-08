import { allEventsAction } from "~/actions";
import EventsList from "./_components/EventsList";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <EventsList getEvents={allEventsAction} />
      </div>
    </main>
  );
}
