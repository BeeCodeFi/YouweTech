import { Router } from 'express';
import {
  createInquiry,
  listInquiries,
  getInquiry,
  updateInquiryStatus,
} from '../controllers/inquiry.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { publicRateLimit } from '../middleware/rateLimit.middleware';

const router = Router();

// Public — contact form (rate limited)
router.post('/', publicRateLimit, createInquiry);

// Admin only
router.use(authenticate, requireRole('ADMIN'));
router.get('/', listInquiries);
router.get('/:id', getInquiry);
router.patch('/:id/status', updateInquiryStatus);

export { router as inquiryRouter };
