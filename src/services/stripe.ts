import Stripe from "stripe";
import { version } from "../../package.json";

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2025-06-30.basil",
  appInfo: {
    name: "03-ignews",
    version,
  },
}); 