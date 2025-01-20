import EventsList from "./_components/EventsList";
import { Suspense } from "react";
import ProgressBar from "./_components/ProgressBar";
import { fetchEventsForUser } from "~/lib/events";

export default async function HomePage() {
  const eventsData = await fetchEventsForUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          <EventsList events={eventsData} />
        </Suspense>
      </div>
    </main>
  );
}
