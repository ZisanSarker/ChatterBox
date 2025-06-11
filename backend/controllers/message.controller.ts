import { Request, Response, NextFunction } from 'express';
import { messageStorage } from '../storage/message.storage';

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = messageStorage.getMessages();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getMessageStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = {
      messageCount: messageStorage.getMessageCount(),
      timestamp: new Date().toISOString()
    };
    res.json(stats);
  } catch (error) {
    next(error);
  }
};