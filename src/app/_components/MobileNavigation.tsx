import { SignOutButton, UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { checkRole } from "~/lib/roles";

const MobileNavigation = async () => {
  const isAdmin = await checkRole("admin");

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <div>
            <SheetHeader className="flex items-center justify-between">
              <UserButton />
              <SheetTitle className="hidden">Menu</SheetTitle>
            </SheetHeader>
            <Separator className="mt-4" />
            <div className="mt-4 flex flex-col gap-4">
              <SheetClose asChild>
                <Link href={"my-events"}>My Events</Link>
              </SheetClose>
              {isAdmin && (
                <SheetClose asChild>
                  <Link href={"/admin-dashboard"}>Staff Dashboard</Link>
                </SheetClose>
              )}
            </div>
          </div>
          <SheetFooter>
            <SignOutButton>
              <Button variant={"destructive"}>Sign Out</Button>
            </SignOutButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
