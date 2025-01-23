export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProgressBar from "../_components/ProgressBar";
import { fetchRegisteredEvents } from "~/lib/events";
import MyEventsList from "./_components/MyEventsList";

const MyEvents = async () => {
  const eventsData = await fetchRegisteredEvents();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Suspense fallback={<ProgressBar />}>
        <MyEventsList events={eventsData} />
      </Suspense>
    </div>
  );
};

export default MyEvents;
