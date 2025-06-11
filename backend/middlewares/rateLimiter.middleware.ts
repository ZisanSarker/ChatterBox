import rateLimit from 'express-rate-limit';

export const messageRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per windowMs
  message: {
    error: {
      message: 'Too many requests, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});
