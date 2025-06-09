import { Server, Socket } from 'socket.io';
import Message from '../models/message.model';

interface UserMap {
  [socketId: string]: string;
}

let onlineUsers: UserMap = {};

export const setupChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (username: string) => {
      onlineUsers[socket.id] = username;
      io.emit('users', Object.values(onlineUsers));
      console.log(`${username} joined the chat`);
    });

    socket.on('sendMessage', async (text: string) => {
      const username = onlineUsers[socket.id];
      if (!username) return;
      const message = new Message({ username, text });
      await message.save();
      io.emit('message', message);
    });

    socket.on('typing', (isTyping: boolean) => {
      const username = onlineUsers[socket.id];
      if (!username) return;
      io.emit('typing', { username, isTyping });
    });

    socket.on('disconnect', () => {
      const username = onlineUsers[socket.id];
      delete onlineUsers[socket.id];
      io.emit('users', Object.values(onlineUsers));
      console.log(`${username} disconnected`);
    });
  });
};
