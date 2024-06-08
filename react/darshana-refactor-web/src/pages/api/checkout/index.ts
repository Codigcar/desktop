import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from 'stripe';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    return response
      .status(403)
      .json({ message: 'Error creating Stripe Checkout session' });
  }

  const { body } = request;

  const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],

      success_url: `${body.domain}?sessionId={CHECKOUT_SESSION_ID}`,

      cancel_url: `${body.domain}`,
    });

    return response.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return response
      .status(500)
      .json({ message: 'Error creating Stripe Checkout session' });
  }
}
