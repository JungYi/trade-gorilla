import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes';

const app = express();

// Security: Helmet sets various HTTP headers to secure the app
app.use(helmet());
app.use(express.json());

// Security: CORS Allowlist
const explicitOrigins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Always allow local dev
const allowlist = new Set<string>(['http://localhost:5173', ...explicitOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Exact allowlist match
      if (allowlist.has(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview URLs
      if (/^https:\/\/trade-gorilla-.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting for public endpoints to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api', apiRoutes);

// Centralized Error Handler
// Reason: Prevents leaking stack traces to clients in production
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
  });
});

export default app;
