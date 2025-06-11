import React, { useState } from 'react';
import ChatPage from './pages/ChatPage';
import { styles, createGlassEffect } from './constants/styles';
import { colors } from './constants/colors';
import { animations } from './constants/animations';

function App() {
  const [username, setUsername] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleJoinChat = () => {
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  if (!username) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: colors.gradients.background,
          padding: styles.spacing.md,
        }}
      >
        <div
          style={{
            ...createGlassEffect(0.15, 20),
            padding: styles.spacing.xl,
            borderRadius: styles.borderRadius.xl,
            maxWidth: '400px',
            width: '100%',
            boxShadow: styles.shadows.large,
            animation: `${animations.keyframes.fadeIn} ${animations.duration.normal} ${animations.timing.easeOut}`,
          }}
        >
          <h1
            style={{
              fontSize: styles.typography.fontSizes.xl,
              fontWeight: styles.typography.fontWeights.bold,
              color: colors.text.primary,
              marginBottom: styles.spacing.xl,
              textAlign: 'center',
            }}
          >
            Welcome to ChatterBox
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.lg }}>
            <input
              type="text"
              placeholder="Enter your username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJoinChat();
                }
              }}
              maxLength={20}
              style={{
                ...styles.components.input.primary,
                width: '100%',
              }}
            />
            <button
              onClick={handleJoinChat}
              disabled={!inputValue.trim()}
              style={{
                ...styles.components.button.primary,
                width: '100%',
                opacity: inputValue.trim() ? 1 : 0.5,
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Join Chat
            </button>
          </div>
          <p
            style={{
              fontSize: styles.typography.fontSizes.sm,
              color: colors.text.secondary,
              marginTop: styles.spacing.lg,
              textAlign: 'center',
            }}
          >
            Choose a username to start chatting
          </p>
        </div>
      </div>
    );
  }

  return <ChatPage username={username} />;
}

export default App;