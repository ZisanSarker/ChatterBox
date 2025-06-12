export interface Message {
  id?: string;
  username: string;
  text: string;
  createdAt: string;
  type?: 'user' | 'system';
}

export interface TypingUser {
  username: string;
  isTyping: boolean;
}