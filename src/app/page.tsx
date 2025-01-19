import { allEventsAction } from "~/actions";
import EventsList from "./_components/EventsList";
import { Suspense } from "react";
import ProgressBar from "./_components/ProgressBar";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          <EventsList getEvents={allEventsAction} />
        </Suspense>
      </div>
    </main>
  );
}
