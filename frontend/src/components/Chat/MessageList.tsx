import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import type { Message } from '../../types';

const MessageList: React.FC<{ messages: Message[]; username: string }> = ({ messages, username }) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px',
      minHeight: 0,
    }}>
      {messages.map((msg, i) => (
        <MessageItem key={msg.createdAt + i} message={msg} isOwn={msg.username === username} />
      ))}
      <div ref={endRef} />
    </div>
  );
};
export default MessageList;