import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { Stripe } from 'stripe';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'GET') {
    return response
      .status(403)
      .json({ message: 'Error creating Stripe Checkout session' });
  }

  const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

  try {
    const prices = await stripe.prices.list();

    return response.status(200).json(prices.data);
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return response
      .status(500)
      .json({ message: 'Error creating Stripe Checkout session' });
  }
}
