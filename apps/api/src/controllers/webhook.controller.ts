import { Request, Response, NextFunction } from 'express';
import { stripe } from '../lib/stripe';
import { prisma } from '../lib/prisma';

export async function handleStripeWebhook(req: Request, res: Response, next: NextFunction) {
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    res.status(400).json({ error: 'Missing stripe-signature header' });
    return;
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed';
    res.status(400).json({ error: message });
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const invoiceId = session.metadata?.invoiceId;
        if (invoiceId) {
          await prisma.invoice.update({
            where: { id: invoiceId },
            data: {
              status: 'PAID',
              stripePaymentId: session.payment_intent as string,
            },
          });
        }
        break;
      }
      case 'customer.created': {
        const customer = event.data.object;
        if (customer.email) {
          await prisma.user.updateMany({
            where: { email: customer.email },
            data: { stripeCustomerId: customer.id },
          });
        }
        break;
      }
      default:
        break;
    }
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
}
