import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

class MessageStorage {
  private messages: Message[] = [];

  addMessage(username: string, text: string): Message {
    const message: Message = {
      id: uuidv4(),
      username,
      text,
      createdAt: new Date().toISOString()
    };
    
    this.messages.push(message);
    return message;
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  clearMessages(): void {
    this.messages = [];
  }

  getMessageCount(): number {
    return this.messages.length;
  }
}

export const messageStorage = new MessageStorage();