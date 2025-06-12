import React, { useState, useRef, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { styles, createGlassEffect } from '../../constants/styles';
import { colors } from '../../constants/colors';

const ChatBox: React.FC<{ username: string }> = ({ username }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const socket = useContext(SocketContext);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
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

  return (
    <div
      style={{
        ...createGlassEffect(0.17, 20),
        padding: styles.spacing.lg,
        borderTop: `1px solid ${colors.interactive.border}`,
        borderRadius: `0 0 ${styles.borderRadius.xl} ${styles.borderRadius.xl}`,
        display: 'flex',
        gap: styles.spacing.md,
        background: colors.gradients.surface,
      }}
    >
      <textarea
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
          height: '42px',
          maxHeight: '120px',
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
          minWidth: 80,
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;