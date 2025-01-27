"use client";

import CompletePage from "../_components/CompletePage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentStatusPage = () => {
  const appearance = {
    theme: "stripe" as const,
  };

  const options = {
    appearance,
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Elements options={options} stripe={stripePromise}>
            <CompletePage />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStatusPage;
