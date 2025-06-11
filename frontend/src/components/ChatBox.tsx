import React, { useState, useRef, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import MessageItem from './MessageItem';
import { colors } from '../constants/colors';
import { styles, createGlassEffect } from '../constants/styles';
import { animations } from '../constants/animations';
import type { Message } from '../types';

interface Props {
  messages: Message[];
  username: string;
}

export default function ChatBox({ messages, username }: Props) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (text.trim() && socket) {
      socket.emit('sendMessage', text.trim());
      setText('');
      socket.emit('typing', false);
    }
  };

  const handleTyping = () => {
    if (!socket) return;
    
    socket.emit('typing', true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!socket) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          ...createGlassEffect(0.1, 20),
          borderRadius: styles.borderRadius.xl,
          margin: styles.spacing.md,
          color: colors.text.secondary,
          fontSize: styles.typography.fontSizes.lg,
          fontWeight: styles.typography.fontWeights.medium,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: styles.spacing.md,
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: `2px solid ${colors.interactive.primary}`,
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          Connecting...
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .messages-container::-webkit-scrollbar {
            width: 6px;
          }

          .messages-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .messages-container::-webkit-scrollbar-thumb {
            background: ${colors.interactive.border};
            border-radius: 3px;
          }

          .chat-input:focus {
            border-color: ${colors.interactive.primary};
            box-shadow: 0 0 0 2px ${colors.interactive.focus};
          }
        `}
      </style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: colors.gradients.background,
          borderRadius: styles.borderRadius.xl,
          overflow: 'hidden',
          margin: styles.spacing.md,
          boxShadow: styles.shadows.large,
        }}
      >
        <div
          className="messages-container"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: styles.spacing.lg,
            background: 'transparent',
          }}
        >
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.username}-${message.createdAt}-${index}`}
              message={message}
              isOwn={message.username === username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div
          style={{
            ...createGlassEffect(0.15, 16),
            padding: styles.spacing.lg,
            borderTop: `1px solid ${colors.interactive.border}`,
            borderRadius: `0 0 ${styles.borderRadius.xl} ${styles.borderRadius.xl}`,
            display: 'flex',
            gap: styles.spacing.md,
            background: colors.gradients.surface,
          }}
        >
          <textarea
            className="chat-input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            style={{
              ...styles.components.input.primary,
              flex: 1,
              resize: 'none',
              height: '40px',
              maxHeight: '120px',
              transition: `all ${animations.duration.fast} ${animations.timing.easeInOut}`,
              border: `1px solid ${isFocused ? colors.interactive.primary : colors.interactive.border}`,
            }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            style={{
              ...styles.components.button.primary,
              opacity: text.trim() ? 1 : 0.5,
              cursor: text.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}