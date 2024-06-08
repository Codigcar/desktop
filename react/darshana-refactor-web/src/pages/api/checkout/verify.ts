import { NextApiRequest, NextApiResponse } from 'next';
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

  const { sessionId } = request.query;

  const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

  try {
    if (!sessionId) {
      throw 'no hay sesion id';
    }
    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    return response
      .status(200)
      .json({ payment_status: session.payment_status });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return response
      .status(500)
      .json({ message: 'Error creating Stripe Checkout session' });
  }
}
