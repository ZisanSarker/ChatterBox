import { Server, Socket } from 'socket.io';
import { UserMap } from '../types';
import { messageStorage } from '../storage/message.storage';

let onlineUsers: UserMap = {};

export const setupChatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Send existing messages to the newly connected user
    socket.emit('initialMessages', messageStorage.getMessages());

    socket.on('join', (username: string) => {
      // Validate username
      if (!username || typeof username !== 'string' || username.trim().length === 0) {
        socket.emit('error', { message: 'Invalid username' });
        return;
      }

      onlineUsers[socket.id] = username.trim();
      io.emit('users', Object.values(onlineUsers));
      console.log(`${username} joined the chat. Online users: ${Object.keys(onlineUsers).length}`);
    });

    socket.on('sendMessage', (text: string) => {
      const username = onlineUsers[socket.id];
      if (!username) {
        socket.emit('error', { message: 'User not found. Please rejoin the chat.' });
        return;
      }

      // Validate message text
      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        socket.emit('error', { message: 'Message cannot be empty' });
        return;
      }

      if (text.trim().length > 1000) {
        socket.emit('error', { message: 'Message too long. Maximum 1000 characters.' });
        return;
      }

      try {
        const message = messageStorage.addMessage(username, text.trim());
        io.emit('message', message);
        console.log(`Message from ${username}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('typing', (isTyping: boolean) => {
      const username = onlineUsers[socket.id];
      if (!username) return;

      socket.broadcast.emit('typing', { username, isTyping });
    });

    socket.on('disconnect', () => {
      const username = onlineUsers[socket.id];
      delete onlineUsers[socket.id];
      
      const remainingUsers = Object.values(onlineUsers);
      io.emit('users', remainingUsers);
      
      // Clear messages when all users leave
      if (remainingUsers.length === 0) {
        messageStorage.clearMessages();
        console.log('All users left. Messages cleared.');
      }
      
      console.log(`${username || 'Unknown user'} disconnected. Online users: ${remainingUsers.length}`);
    });

    // Handle connection errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Handle server-level socket errors
  io.engine.on('connection_error', (err) => {
    console.error('Connection error:', err);
  });
};
