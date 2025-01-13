import { Edit, PlusSquare } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const AdminDashboardPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex gap-4">
          <Link href={"/admin-dashboard/create-event"}>
            <Card>
              <CardHeader>
                <CardTitle>Create Event</CardTitle>
                <CardDescription>
                  Add a new event to the listings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlusSquare size={""} />
              </CardContent>
            </Card>
          </Link>
          <Link href={"/admin-dashboard/manage-events"}>
            <Card>
              <CardHeader>
                <CardTitle>Manage Events</CardTitle>
                <CardDescription>
                  View, edit and delete currently listed events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Edit size={""} />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
