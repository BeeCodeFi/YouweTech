import { rateLimit } from 'express-rate-limit';

// Stricter limit for public endpoints (contact form, auth)
export const publicRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
