import React, { useEffect, useState, useContext } from 'react';
import { SocketProvider, SocketContext } from '../context/SocketContext';
import ChatBox from '../components/ChatBox';
import OnlineUsers from '../components/OnlineUsers';
import TypingIndicator from '../components/TypingIndicator';
import type { Message, TypingUser } from '../types';
import { styles, createGlassEffect } from '../constants/styles';
import { colors } from '../constants/colors';

interface Props {
  username: string;
}

function ChatContent({ username }: Props) {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = () => {
      try {
        const savedMessages = localStorage.getItem('chatterbox-messages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load messages:', err);
        setError('Failed to load messages');
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join', username);

    const handleMessage = (msg: Message) => {
      setMessages((prev) => {
        const newMessages = [...prev, msg];
        localStorage.setItem('chatterbox-messages', JSON.stringify(newMessages));
        return newMessages;
      });
    };

    const handleUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    const handleTyping = ({ username: typingUsername, isTyping }: TypingUser) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(user => user.username !== typingUsername);
        return isTyping ? [...filtered, { username: typingUsername, isTyping }] : filtered;
      });
    };

    const handleClearMessages = () => {
      setMessages([]);
      localStorage.removeItem('chatterbox-messages');
    };

    const handleInitialMessages = (initialMessages: Message[]) => {
      setMessages(initialMessages);
      localStorage.setItem('chatterbox-messages', JSON.stringify(initialMessages));
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

  if (!socket || isLoading) {
    return (
      <div
        style={{
          ...createGlassEffect(0.1, 20),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: colors.text.secondary,
        }}
      >
        Loading chat...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          ...createGlassEffect(0.1, 20),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: colors.text.accent,
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: colors.gradients.background,
      }}
    >
      <OnlineUsers users={onlineUsers} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ChatBox messages={messages} username={username} />
        <TypingIndicator typingUsers={typingUsers} />
      </div>
    </div>
  );
}

export default function ChatPage({ username }: Props) {
  return (
    <SocketProvider>
      <ChatContent username={username} />
    </SocketProvider>
  );
}