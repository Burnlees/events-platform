import Link from "next/link";
import { Button } from "~/components/ui/button";
import { checkRole } from "~/lib/roles";

const AdminButton = async () => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) return null;

  return (
    <div>
      <Button size={"sm"}>
        <Link href={"/admin-dashboard"}>Staff Dashboard</Link>
      </Button>
    </div>
  );
};

export default AdminButton;
