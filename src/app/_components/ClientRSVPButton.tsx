"use client";

import { usePathname } from "next/navigation";
import { registerEventAction } from "~/actions";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

type clientRSVPButtonProps = {
  eventId: number;
};

const ClientRSVPButton = ({ eventId }: clientRSVPButtonProps) => {
  const { toast } = useToast();
  const pathName = usePathname();
  

  const handleRSVP = async () => {
    try {
      const response = await registerEventAction(eventId);
      toast({
        title: "Success",
        description: response?.message,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      {pathName === "/my-events" ? null : (
        <Button onClick={handleRSVP} size={"sm"}>
          RSVP
        </Button>
      )}
    </div>
  );
};

export default ClientRSVPButton;
