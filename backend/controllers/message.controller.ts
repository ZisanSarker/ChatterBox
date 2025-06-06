import { Request, Response, NextFunction } from 'express';
import Message from '../models/message.model';

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
