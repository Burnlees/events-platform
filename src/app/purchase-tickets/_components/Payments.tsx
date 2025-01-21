"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { env } from "~/env";
import CheckoutForm from "../_components/CheckoutForm";
import TicketQuantityPicker from "./TicketQuantityPicker";

type PaymentsProps = {
  eventDetails: EventDetails;
};

interface StripeResponse {
  clientSecret: string;
}

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payments = ({ eventDetails }: PaymentsProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState<number>();

  useEffect(() => {
    if (ticketQuantity !== undefined) {
      fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: {
            id: eventDetails.id,
            eventName: eventDetails.name,
            quantity: ticketQuantity,
            price: 3000,
          },
        }),
      })
        .then((res) => res.json() as Promise<StripeResponse>)
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        })
        .catch((error) => {
          console.error("Failed to retrieve payment intent:", error);
        });
    }
  }, [ticketQuantity, eventDetails.id, eventDetails.name]);

  const appearance = {
    theme: "stripe" as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!ticketQuantity)
    return <TicketQuantityPicker setTicketQuantity={setTicketQuantity} />;

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm eventId={eventDetails.id} />
        </Elements>
      )}
    </div>
  );
};

export default Payments;
