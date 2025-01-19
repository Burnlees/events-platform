"use client";

import { useAction } from "next-safe-action/hooks";
import { usePathname, useRouter } from "next/navigation";
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
  const pathName = usePathname();
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
      {pathName === "/my-events" ? null : (
        <Button onClick={handleRSVP} size={"sm"} disabled={isPending}>
          {isPending ? <LoadingSpinner /> : "RSVP"}
        </Button>
      )}
    </div>
  );
};

export default ClientRSVPButton;
