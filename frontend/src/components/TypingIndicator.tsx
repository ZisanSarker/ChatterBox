import { colors } from '../constants/colors';
import { styles, createGlassEffect } from '../constants/styles';
import { animations } from '../constants/animations';
import type { TypingUser } from '../types';

interface Props {
  typingUsers: TypingUser[];
}

export default function TypingIndicator({ typingUsers }: Props) {
  const activeTypers = typingUsers.filter(user => user.isTyping);
  
  if (activeTypers.length === 0) return null;

  const typingText = activeTypers.length === 1 
    ? `${activeTypers[0].username} is typing...`
    : `${activeTypers.map(u => u.username).join(', ')} are typing...`;

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes typingBounce {
            ${Object.entries(animations.keyframes.typingBounce)
              .map(([key, value]) => `${key} { ${Object.entries(value)
                .map(([prop, val]) => `${prop}: ${val}`)
                .join('; ')} }`)
              .join('\n')}
          }
        `}
      </style>
      <div
        style={{
          ...createGlassEffect(0.1, 12),
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
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: colors.gradients.primary,
                animation: `typingBounce 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.2}s`,
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
          {typingText}
        </span>
      </div>
    </>
  );
}