import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import AdminButton from "./AdminButton";
import MobileNavigation from "./MobileNavigation";

export const TopNav = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b px-4 py-2 drop-shadow">
      <div className="font-bold">
        <Link href={"/"}>NextUp</Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <Button size={"sm"}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="md:hidden">
            <MobileNavigation />
          </div>
          <div className="hidden gap-4 md:flex">
            <Button size={"sm"}>
              <Link href={"/my-events"}>My Events</Link>
            </Button>
            <AdminButton />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
