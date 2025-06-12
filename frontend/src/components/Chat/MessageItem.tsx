import React from 'react';
import { styles, createGlassEffect } from '../../constants/styles';
import { colors } from '../../constants/colors';
import type { Message } from '../../types';

const MessageItem: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => {
  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // System message rendering
  if (message.type === 'system' || message.username === 'System') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: `${styles.spacing.sm} 0`,
        }}
      >
        <div
          style={{
            background: 'rgba(60,60,60,0.25)',
            color: colors.text.secondary,
            fontStyle: 'italic',
            fontSize: styles.typography.fontSizes.sm,
            borderRadius: styles.borderRadius.full,
            padding: `4px 18px`,
            boxShadow: styles.shadows.small,
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOwn ? 'flex-end' : 'flex-start',
        marginBottom: styles.spacing.md,
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          maxWidth: 420,
          minWidth: 70,
          padding: `${styles.spacing.md} ${styles.spacing.lg}`,
          borderRadius: isOwn
            ? `${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.sm} ${styles.borderRadius.xl}`
            : `${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.sm}`,
          position: 'relative',
          ...(isOwn
            ? {
                background: colors.message.own.background,
                color: colors.message.own.text,
                boxShadow: '0 4px 12px rgba(99,102,241,0.23)',
              }
            : {
                ...createGlassEffect(0.19, 13),
                color: colors.message.other.text,
                boxShadow: styles.shadows.medium,
              }),
          transition: `all 120ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        {!isOwn && (
          <div
            style={{
              fontSize: styles.typography.fontSizes.xs,
              fontWeight: styles.typography.fontWeights.semibold,
              color: colors.message.other.username,
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.gradients.accent,
                marginRight: styles.spacing.sm,
              }}
            />
            {message.username}
          </div>
        )}
        <div
          style={{
            fontSize: styles.typography.fontSizes.sm,
            lineHeight: styles.typography.lineHeights.normal,
            wordWrap: 'break-word',
            margin: 0,
          }}
        >
          {message.text}
        </div>
        <div
          style={{
            fontSize: styles.typography.fontSizes.xs,
            color: isOwn ? colors.message.own.timestamp : colors.message.other.timestamp,
            marginTop: '4px',
            opacity: 0.7,
            textAlign: isOwn ? 'right' : 'left',
          }}
        >
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;