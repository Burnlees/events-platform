import React from "react";
import ManageEventsTable from "../_components/manage-events-table/ManageEventsTable";
import { allEventsAction } from "~/actions";
import { columns } from "../_components/manage-events-table/Columns";

const ManageEventsPage = async () => {
  const events = await allEventsAction();

  return (
    <div className="container mx-auto py-10">
      <ManageEventsTable columns={columns} data={events ?? []} />
    </div>
  );
};

export default ManageEventsPage;
