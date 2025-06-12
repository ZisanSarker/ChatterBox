import React from 'react';
import { styles, createGlassEffect } from '../../constants/styles';
import { colors } from '../../constants/colors';
import { animations } from '../../constants/animations';
import type { TypingUser } from '../../types';

const TypingIndicator: React.FC<{ typingUsers: TypingUser[] }> = ({ typingUsers }) => {
  const active = typingUsers.filter((u) => u.isTyping);
  if (active.length === 0) return null;
  const text =
    active.length === 1
      ? `${active[0].username} is typing...`
      : `${active.map((u) => u.username).join(', ')} are typing...`;

  return (
    <>
      <style>
        {`
          @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-7px); }
          }
        `}
      </style>
      <div
        style={{
          ...createGlassEffect(0.13, 14),
          borderRadius: styles.borderRadius.lg,
          padding: `${styles.spacing.md} ${styles.spacing.lg}`,
          margin: `${styles.spacing.sm} ${styles.spacing.md}`,
          display: 'flex',
          alignItems: 'center',
          gap: styles.spacing.md,
          animation: `fadeInUp ${animations.duration.normal} ${animations.timing.easeOut}`,
          boxShadow: styles.shadows.small,
        }}
      >
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: colors.gradients.accent,
                animation: `typingBounce 1.4s infinite`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: styles.typography.fontSizes.sm,
            color: colors.text.secondary,
            fontWeight: styles.typography.fontWeights.medium,
            fontStyle: 'italic',
          }}
        >
          {text}
        </span>
      </div>
    </>
  );
};

export default TypingIndicator;