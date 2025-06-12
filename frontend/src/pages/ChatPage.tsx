import React, { useContext } from 'react';
import { SocketProvider } from '../context/SocketContext';
import ChatContent from '../components/Chat/ChatContent';

const ChatPage: React.FC<{ username: string }> = ({ username }) => (
  <SocketProvider>
    <ChatContent username={username} />
  </SocketProvider>
);

export default ChatPage;