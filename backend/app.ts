import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import messageRoutes from './routes/message.route';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { messageRateLimit } from './middlewares/rateLimiter.middleware';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/messages', messageRateLimit);

// Routes
app.use('/api/messages', messageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: { message: 'Route not found' } });
});

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;