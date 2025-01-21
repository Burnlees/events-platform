"use client";

import { Calendar1Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { AddToCalanderAction } from "~/actions";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { extractErrorMessage } from "~/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

type AddToCalanderButtonProps = {
  eventDetails: EventDetails;
};

const AddToCalanderButton = ({ eventDetails }: AddToCalanderButtonProps) => {
  const { toast } = useToast();
  const { execute, isPending } = useAction(AddToCalanderAction, {
    onSuccess: ({ data }) => {
      toast({
        title: "Success",
        description: `${data?.summary} was added to your google calendar.`,
      });
    },
    onError: ({ error }) => {
      const errorMessage = extractErrorMessage(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleClick = () => {
    const { name, date, time, venue, city, id } = eventDetails;
    execute({ name, date, time, venue, city, id });
  };

  return (
    <div>
      <Button
        size={"sm"}
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? <LoadingSpinner /> : <Calendar1Icon />}
      </Button>
    </div>
  );
};

export default AddToCalanderButton;
