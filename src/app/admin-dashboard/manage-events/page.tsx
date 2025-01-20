import React, { Suspense } from "react";
import ManageEventsTable from "../_components/manage-events-table/ManageEventsTable";
import { columns } from "../_components/manage-events-table/Columns";
import ProgressBar from "~/app/_components/ProgressBar";
import { getAllEvents } from "~/server/queries";

const ManageEventsPage = async () => {
  const events = await getAllEvents();

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<ProgressBar />}>
        <ManageEventsTable columns={columns} data={events ?? []} />
      </Suspense>
    </div>
  );
};

export default ManageEventsPage;
