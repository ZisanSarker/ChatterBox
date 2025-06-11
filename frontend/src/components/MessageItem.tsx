import { colors } from '../constants/colors';
import { styles, createGlassEffect } from '../constants/styles';
import { animations } from '../constants/animations';
import type { Message } from '../types';

interface Props {
  message: Message;
  isOwn: boolean;
}

export default function MessageItem({ message, isOwn }: Props) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes messageSlideIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .message-item:hover {
            transform: translateY(-1px);
          }
          
          .message-bubble::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            ${isOwn ? `
              right: -6px;
              top: 20px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid rgba(99, 102, 241, 0.9);
              transform: rotate(45deg);
            ` : `
              left: -6px;
              top: 20px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid rgba(255, 255, 255, 0.15);
              transform: rotate(-45deg);
            `}
          }
        `}
      </style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOwn ? 'flex-end' : 'flex-start',
          marginBottom: styles.spacing.md,
          animation: `messageSlideIn ${animations.duration.normal} ${animations.timing.easeOut}`,
        }}
        className="message-item"
      >
        <div
          style={{
            maxWidth: '320px',
            minWidth: '80px',
            padding: `${styles.spacing.md} ${styles.spacing.lg}`,
            borderRadius: isOwn 
              ? `${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.sm} ${styles.borderRadius.xl}`
              : `${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.xl} ${styles.borderRadius.sm}`,
            position: 'relative',
            ...(isOwn ? {
              background: colors.message.own.background,
              color: colors.message.own.text,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            } : {
              ...createGlassEffect(0.15, 12),
              color: colors.message.other.text,
              boxShadow: styles.shadows.medium,
            }),
            transition: `all ${animations.duration.fast} ${animations.timing.easeInOut}`,
          }}
          className="message-bubble"
        >
          {!isOwn && (
            <div
              style={{
                fontSize: styles.typography.fontSizes.xs,
                fontWeight: styles.typography.fontWeights.semibold,
                color: colors.message.other.username,
                marginBottom: '2px',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: colors.gradients.primary,
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
              opacity: 0.8,
              textAlign: isOwn ? 'right' : 'left',
            }}
          >
            {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    </>
  );
}