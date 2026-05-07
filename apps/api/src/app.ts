import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';

import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { inquiryRouter } from './routes/inquiry.routes';
import { projectRouter } from './routes/project.routes';
import { invoiceRouter } from './routes/invoice.routes';
import { webhookRouter } from './routes/webhook.routes';
import { healthRouter } from './routes/health.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  ...(process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  'http://localhost:3000',
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);
app.options('*', cors());

// ── Rate limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ── Stripe webhooks need raw body — mount BEFORE json middleware ──────────────
app.use('/api/webhooks', webhookRouter);

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/projects', projectRouter);
app.use('/api/invoices', invoiceRouter);

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
