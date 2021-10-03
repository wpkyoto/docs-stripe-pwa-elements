// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

interface Response<Body = any> {
  statusCode: number;
  body?: Body;
}
type NextAPIHandler<Body = any> = (
  req: NextApiRequest
) => Promise<Response<Body>>;

export type CreatePaymentIntentResponse = {
  client_secret: string | null;
  amount: number;
};
/**
 * Create a simple example of PaymentIntent
 */
const createPaymentIntent: NextAPIHandler<CreatePaymentIntentResponse> = async (
  req
) => {
  const currency = req.body.currency || "usd";
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(Math.random() * 10000),
    currency,
  });

  return {
    statusCode: 200,
    body: {
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    },
  };
};

export type CreateSetupIntentResponse = {
  client_secret: string | null;
  usage: string;
};
/**
 * Create a simple example of SetupIntent
 */
const createSetupIntent: NextAPIHandler<CreateSetupIntentResponse> = async (
  req
) => {
  const usage = req.body.usage || "off_session";
  const setupIntent = await stripe.setupIntents.create({
    usage,
  });

  return {
    statusCode: 200,
    body: {
      client_secret: setupIntent.client_secret,
      usage: setupIntent.usage,
    },
  };
};

export type CreateSubscriptionResponse = {
  subscription_id: string;
  client_secret: string | null;
};
/**
 * Create a simple example of subscription
 */
const createSubscription: NextAPIHandler<CreateSubscriptionResponse> =
  async () => {
    const customer = await stripe.customers.create();
    const subscription = await stripe.subscriptions.create({
      customer: typeof customer === "string" ? customer : customer.id,
      items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    return {
      statusCode: 200,
      body: {
        subscription_id: subscription.id,
        // @ts-expect-error
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
      },
    };
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      switch (req.body.type) {
        case "setup_intent":
          const setupIntentResponse = await createSetupIntent(req);
          return res.status(201).json(setupIntentResponse);
        case "subscription":
          const subscriptionResponse = await createSubscription(req);
          return res.status(201).json(subscriptionResponse);
        case "payment_intent":
        default:
          const paymentIntentResponse = await createPaymentIntent(req);
          return res.status(201).json(paymentIntentResponse);
      }
    }
    return res.status(404);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      res.status(500).json({
        message: e.message,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}
