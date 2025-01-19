import { Suspense } from "react";
import EditEventForm from "../../_components/EditEventForm";
import { getEventById } from "~/server/queries";
import ProgressBar from "~/app/_components/ProgressBar";

const EditEventPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const id = Number((await params).id);

  const eventDetails = await getEventById(id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Suspense fallback={<ProgressBar />}>
          {eventDetails ? (
            <EditEventForm selectedEventDetails={eventDetails} />
          ) : (
            `Event with ID: ${id} not found`
          )}
        </Suspense>
      </div>
    </main>
  );
};

export default EditEventPage;
