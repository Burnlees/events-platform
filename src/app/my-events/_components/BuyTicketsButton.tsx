import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

type BuyTicketsButtonProps = {
  eventId: number;
};

const BuyTicketsButton = ({ eventId }: BuyTicketsButtonProps) => {
  return (
    <div>
      <Link href={`/purchase-tickets/${eventId}`}>
        <Button size={"sm"} variant={"outline"}>
          <ShoppingBasketIcon />
        </Button>
      </Link>
    </div>
  );
};

export default BuyTicketsButton;
