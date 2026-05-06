import { Router } from 'express';
import {
  listInvoices,
  getInvoice,
  createCheckoutSession,
  createCustomerPortalSession,
} from '../controllers/invoice.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', listInvoices);
router.get('/:id', getInvoice);
router.post('/:id/checkout', createCheckoutSession);
router.post('/portal', createCustomerPortalSession);

// Admin: create invoice
import { createInvoice } from '../controllers/invoice.controller';
router.post('/', requireRole('ADMIN'), createInvoice);

export { router as invoiceRouter };
