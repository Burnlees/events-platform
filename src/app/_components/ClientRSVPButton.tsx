"use client";

import { registerForEvent } from "~/actions";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

type clientRSVPButtonProps = {
  eventName: string;
  eventDate: string;
};

const ClientRSVPButton = ({ eventName, eventDate }: clientRSVPButtonProps) => {
  const { toast } = useToast();

  const handleRSVP = async () => {
    try {
      const response = await registerForEvent(eventName, eventDate);
      toast({
        title: "Success",
        description: response.message,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Button onClick={handleRSVP} size={"sm"}>
        RSVP
      </Button>
    </div>
  );
};

export default ClientRSVPButton;
