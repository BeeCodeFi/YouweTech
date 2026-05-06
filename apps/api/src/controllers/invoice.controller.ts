import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { stripe } from '../lib/stripe';
import { AuthRequest } from '../middleware/auth.middleware';

const createSchema = z.object({
  clientId: z.string(),
  projectId: z.string().optional(),
  amount: z.number().int().positive(), // in cents
  description: z.string().max(500).optional(),
  dueDate: z.string().datetime().optional(),
});

export async function listInvoices(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user!.role === 'ADMIN';
    const invoices = await prisma.invoice.findMany({
      where: isAdmin ? undefined : { clientId: req.user!.id },
      include: { project: { select: { id: true, title: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ invoices });
  } catch (err) {
    next(err);
  }
}

export async function getInvoice(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: {
        client: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, title: true } },
      },
    });

    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    if (req.user!.role !== 'ADMIN' && invoice.clientId !== req.user!.id) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    res.json({ invoice });
  } catch (err) {
    next(err);
  }
}

export async function createInvoice(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = createSchema.parse(req.body);
    const invoice = await prisma.invoice.create({
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
    });
    res.status(201).json({ invoice });
  } catch (err) {
    next(err);
  }
}

export async function createCheckoutSession(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const invoice = await prisma.invoice.findUnique({ where: { id: req.params.id } });
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
      return;
    }

    if (req.user!.role !== 'ADMIN' && invoice.clientId !== req.user!.id) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: invoice.currency,
            unit_amount: invoice.amount,
            product_data: { name: invoice.description ?? `Invoice #${invoice.id}` },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/portal/invoices?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/portal/invoices/${invoice.id}`,
      metadata: { invoiceId: invoice.id },
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
}

export async function createCustomerPortalSession(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user?.stripeCustomerId) {
      res.status(400).json({ error: 'No Stripe customer found' });
      return;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/portal/invoices`,
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
}
