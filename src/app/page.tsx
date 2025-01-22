import EventsList from "./_components/EventsList";
import { Suspense } from "react";
import ProgressBar from "./_components/ProgressBar";
import { fetchEventsForUser } from "~/lib/events";
import EventListPagination from "./_components/EventListPagination";

export default async function HomePage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const pageNumber = searchParams?.page ? parseInt(searchParams.page) : 1;

  const eventsData = await fetchEventsForUser(pageNumber);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          <EventsList events={eventsData?.events} />
          <EventListPagination currentPage={pageNumber} totalPages={eventsData?.totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
