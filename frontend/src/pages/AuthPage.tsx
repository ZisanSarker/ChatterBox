import React, { useState } from 'react';
import { styles, createGlassEffect } from '../constants/styles';
import { colors } from '../constants/colors';
import PageContainer from '../components/Layout/PageContainer';

const AuthPage: React.FC<{ onSubmit: (username: string) => void }> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <PageContainer>
      <div
        style={{
          ...createGlassEffect(0.13, 24),
          padding: styles.spacing.xxl,
          borderRadius: styles.borderRadius.xxl,
          boxShadow: styles.shadows.large,
          width: '100%',
          maxWidth: 380,
          minWidth: 260,
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontSize: styles.typography.fontSizes.xl,
            fontWeight: styles.typography.fontWeights.bold,
            color: colors.text.primary,
            marginBottom: styles.spacing.xl,
          }}
        >
          Welcome to ChatterBox
        </h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' && inputValue.trim() && onSubmit(inputValue.trim()))}
          maxLength={20}
          style={{
            ...styles.components.input.primary,
            width: '100%',
            marginBottom: styles.spacing.lg,
          }}
        />
        <button
          onClick={() => inputValue.trim() && onSubmit(inputValue.trim())}
          disabled={!inputValue.trim()}
          style={{
            ...styles.components.button.primary,
            width: '100%',
            opacity: inputValue.trim() ? 1 : 0.5,
          }}
        >
          Join Chat
        </button>
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
    </PageContainer>
  );
};
export default AuthPage;