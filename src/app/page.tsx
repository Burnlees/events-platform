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
    <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-black leading-[0.85] md:text-8xl">
          Find your next event
        </h1>
        <p className="mt-4 text-xl font-semibold text-muted-foreground">
          Discover, RSVP, and attend events near you
        </p>
      </div>
      <Suspense fallback={<ProgressBar />}>
        <EventListOrderSort />
        <EventsList events={eventsData?.events} />
        <EventListPagination
          currentPage={pageNumber}
          totalPages={eventsData?.totalPages}
        />
      </Suspense>
    </div>
  );
}
