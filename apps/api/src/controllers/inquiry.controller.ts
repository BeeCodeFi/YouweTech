import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { sendInquiryNotification } from '../lib/email';
import { AuthRequest } from '../middleware/auth.middleware';

const createSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

export async function createInquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createSchema.parse(req.body);
    const inquiry = await prisma.inquiry.create({ data });
    await sendInquiryNotification(inquiry);
    res.status(201).json({ message: 'Inquiry submitted successfully', id: inquiry.id });
  } catch (err) {
    next(err);
  }
}

export async function listInquiries(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ inquiries });
  } catch (err) {
    next(err);
  }
}

export async function getInquiry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const inquiry = await prisma.inquiry.findUnique({ where: { id: req.params.id as string } });
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.json({ inquiry });
  } catch (err) {
    next(err);
  }
}

export async function updateInquiryStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const schema = z.object({ status: z.enum(['NEW', 'IN_REVIEW', 'RESPONDED', 'CLOSED']) });
    const { status } = schema.parse(req.body);
    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id as string },
      data: { status },
    });
    res.json({ inquiry });
  } catch (err) {
    next(err);
  }
}
