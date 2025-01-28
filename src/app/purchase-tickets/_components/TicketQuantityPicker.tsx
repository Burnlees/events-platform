"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type TicketQuantityPickerProps = {
  setTicketQuantity: Dispatch<SetStateAction<number | undefined>>;
};

const TicketQuantityPicker = ({
  setTicketQuantity,
}: TicketQuantityPickerProps) => {
  const [numTickets, setNumTickets] = useState<number>(0);

  const handleClick = () => {
    setTicketQuantity(numTickets);
  };

  return (
    <div className="mx-auto my-4 flex md:w-1/2 gap-4">
      <Label htmlFor="ticketQuantity">How many?</Label>
      <Input
        type="number"
        id="ticketQuantity"
        value={numTickets}
        onChange={(e) => {
          const value = e.target.valueAsNumber;
          if (!isNaN(value) && value > 0) {
            setNumTickets(value);
          } else {
            setNumTickets(0);
          }
        }}
      />
      <Button size={"sm"} onClick={handleClick}>Get Tickets</Button>
    </div>
  );
};

export default TicketQuantityPicker;
