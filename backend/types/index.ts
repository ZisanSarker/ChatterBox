export interface Message {
  id: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface UserMap {
  [socketId: string]: string;
}