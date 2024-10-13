import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'micro-cors';
import Stripe from 'stripe';
import { IncomingMessage } from 'http';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});
const cors = Cors({ allowMethods: ['POST', 'HEAD'] });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Hàm để lấy raw body
const getRawBody = async (req: IncomingMessage) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', (err) => reject(err));
  });
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await getRawBody(req);
    const sig = req.headers['stripe-signature']!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      if (err instanceof Error) {
  
      } else {
      }
      const errorMessage = (err as Error).message;
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }
    res.status(200).send('Received');
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default cors(webhookHandler as any);
