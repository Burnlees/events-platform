import Payments from "../_components/Payments";
import ProgressBar from "../../_components/ProgressBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Suspense } from "react";
import { getEventById } from "~/server/queries";

export default async function PurchaseTicketsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = Number((await params).id);
  const eventDetails = await getEventById(id);

  if (!eventDetails) return <div>No event found.</div>;

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Suspense fallback={<ProgressBar />}>
        <Card className="w-1/2">
          <CardHeader className="overflow-hidden p-0">
            <img
              className="rounded-t-md"
              src={eventDetails?.image}
              alt={eventDetails.image}
            ></img>
            <CardTitle className="p-4">{eventDetails?.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CardDescription>
              <div className="flex justify-between">
                <div>
                  <span className="font-bold">£30</span> /person
                </div>
                <div>{eventDetails?.venue}</div>
              </div>
            </CardDescription>
            <Payments eventDetails={eventDetails} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
