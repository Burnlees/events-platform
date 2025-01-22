"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { registerEventAction } from "~/actions";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { extractErrorMessage } from "~/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

type clientRSVPButtonProps = {
  eventId: number;
};

const ClientRSVPButton = ({ eventId }: clientRSVPButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { execute, isPending } = useAction(registerEventAction, {
    onSuccess: ({ data }) => {
      toast({
        title: "Success",
        description: `Registered for ${data?.eventDetails?.name}`,
      });
      router.refresh();
    },
    onError: ({ error }) => {
      const errorMessage = extractErrorMessage(error);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      router.refresh();
    },
  });

  const handleRSVP = async () => {
    execute({ id: eventId });
  };

  return (
    <div>
      <Button
        onClick={handleRSVP}
        size={"sm"}
        disabled={isPending}
        variant={"outline"}
      >
        {isPending ? <LoadingSpinner /> : "RSVP"}
      </Button>
    </div>
  );
};

export default ClientRSVPButton;
