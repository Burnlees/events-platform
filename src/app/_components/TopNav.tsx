import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

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
          <div className="flex gap-4">
            <Button size={"sm"}>
              <Link href={"/my-events"}>My Events</Link>
            </Button>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
