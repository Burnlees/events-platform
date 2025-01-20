export const dynamic = "force-dynamic";

import EventsList from "../_components/EventsList";
import { Suspense } from "react";
import ProgressBar from "../_components/ProgressBar";
import { fetchRegisteredEvents } from "~/lib/events";

const MyEvents = async () => {
  const eventsData = await fetchRegisteredEvents();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          <EventsList events={eventsData} />
        </Suspense>
      </div>
    </main>
  );
};

export default MyEvents;
