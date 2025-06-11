export interface Message {
  username: string;
  text: string;
  createdAt: string;
}

export interface TypingUser {
  username: string;
  isTyping: boolean;
}