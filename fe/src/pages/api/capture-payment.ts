// pages/api/capture-payment.js
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { paymentIntentId } = req.body;

      const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

      res.status(200).send(paymentIntent);
    } catch (error) {
      res.status(500).send({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}