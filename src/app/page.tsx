import EventsList from "./_components/EventsList";
import { Suspense } from "react";
import ProgressBar from "./_components/ProgressBar";
import { fetchEventsForUser } from "~/lib/events";
import EventListPagination from "./_components/EventListPagination";
import EventListOrderSort from "./_components/EventListOrderSort";

export default async function HomePage(props: {
  searchParams?: Promise<{
    page?: string;
    order?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const pageNumber = searchParams?.page ? parseInt(searchParams.page) : 1;
  const orderBy = searchParams?.order;
  const sortBy = searchParams?.sort;

  const eventsData = await fetchEventsForUser(pageNumber, orderBy, sortBy);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          <EventListOrderSort />
          <EventsList events={eventsData?.events} />
          <EventListPagination
            currentPage={pageNumber}
            totalPages={eventsData?.totalPages}
          />
        </Suspense>
      </div>
    </main>
  );
}
