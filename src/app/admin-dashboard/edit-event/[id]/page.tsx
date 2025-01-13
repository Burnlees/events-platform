import EditEventForm from "../../_components/EditEventForm";
import { getEventById } from "~/server/queries";

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
        {eventDetails ? (
          <EditEventForm selectedEventDetails={eventDetails} />
        ) : (
          `Event with ID: ${id} not found`
        )}
      </div>
    </main>
  );
};

export default EditEventPage;
