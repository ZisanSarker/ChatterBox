import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { setupChatSocket } from './sockets/chat.socket';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

setupChatSocket(io);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
