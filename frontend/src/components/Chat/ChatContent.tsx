import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import MessageList from './MessageList';
import ChatBox from './ChatBox';
import TypingIndicator from './TypingIndicator';
import OnlineUsersSidebar from '../Sidebar/OnlineUsersSidebar';
import OnlineUsersTopbar from '../Topbar/OnlineUsersTopbar';
import Loader from '../Shared/Loader';
import { useResponsive } from '../../hooks/useResponsive';
import type { Message, TypingUser } from '../../types';

const ChatContent: React.FC<{ username: string }> = ({ username }) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const loadMessages = () => {
      try {
        const savedMessages = localStorage.getItem('chatterbox-messages');
        if (savedMessages) setMessages(JSON.parse(savedMessages));
        setLoading(false);
      } catch (err) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join', username);

    const handleMessage = (msg: Message) => {
      setMessages(prev => {
        const next = [...prev, msg];
        localStorage.setItem('chatterbox-messages', JSON.stringify(next));
        return next;
      });
    };
    const handleUsers = (users: string[]) => setOnlineUsers(users);
    const handleTyping = ({ username, isTyping }: TypingUser) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(u => u.username !== username);
        return isTyping ? [...filtered, { username, isTyping }] : filtered;
      });
    };
    const handleClearMessages = () => {
      setMessages([]);
      localStorage.removeItem('chatterbox-messages');
    };
    const handleInitialMessages = (msgs: Message[]) => {
      setMessages(msgs);
      localStorage.setItem('chatterbox-messages', JSON.stringify(msgs));
    };

    socket.on('message', handleMessage);
    socket.on('users', handleUsers);
    socket.on('typing', handleTyping);
    socket.on('clearMessages', handleClearMessages);
    socket.on('initialMessages', handleInitialMessages);

    return () => {
      socket.off('message', handleMessage);
      socket.off('users', handleUsers);
      socket.off('typing', handleTyping);
      socket.off('clearMessages', handleClearMessages);
      socket.off('initialMessages', handleInitialMessages);
    };
  }, [socket, username]);

  if (loading || !socket) return <Loader text="Loading chat..." />;
  if (error) return <Loader text={error} isError />;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      overflow: 'hidden',
    }}>
      {/* Sidebar for all screens except mobile */}
      {!isMobile && <OnlineUsersSidebar users={onlineUsers} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar for mobile */}
        {isMobile && <OnlineUsersTopbar users={onlineUsers} />}
        <MessageList messages={messages} username={username} />
        <TypingIndicator typingUsers={typingUsers} />
        <ChatBox username={username} />
      </div>
    </div>
  );
};

export default ChatContent;