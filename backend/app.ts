import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/message.route';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoutes);

// Error handler middleware (last middleware)
app.use(errorHandler);

export default app;
