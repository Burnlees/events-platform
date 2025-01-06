import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export const TopNav = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b px-4 py-2 drop-shadow">
      <div className="font-bold">NextUp</div>
      <div>
        <SignedOut>
          <SignInButton>
            <Button size={"sm"}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
