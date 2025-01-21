import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: OrderDetails) => {
  const { quantity, price } = items;
  if (
    typeof quantity !== "number" ||
    typeof price !== "number" ||
    quantity <= 0 ||
    price <= 0
  ) {
    throw new Error("Invalid quantity or price");
  }

  return quantity * price;
};

const requestValidator = z.object({
  id: z.number(),
  eventName: z.string(),
  quantity: z.number(),
  price: z.number(),
});

type requestBody = {
  items: {
    id: number;
    eventName: string;
    quantity: number;
    price: number;
  };
};

export async function POST(req: Request) {
  try {
    // Parse and validate the JSON body
    const { items } = (await req.json()) as requestBody;

    if (!requestValidator.safeParse(items)) {
      return new Response(JSON.stringify({ error: "Invalid order details" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
      description: `eventId: ${items.id}, ${items.eventName}`,
    });

    // Respond with the clientSecret for the frontend to handle the payment
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
