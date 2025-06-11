import { colors } from '../constants/colors';
import { styles, createGlassEffect } from '../constants/styles';
import { animations } from '../constants/animations';

interface Props {
  users: string[];
}

export default function OnlineUsers({ users }: Props) {
  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes pulse {
            ${Object.entries(animations.keyframes.pulse)
              .map(([key, value]) => `${key} { opacity: ${value.opacity}; }`)
              .join('\n')}
          }
          
          .user-badge:hover {
            transform: translateY(-1px);
            box-shadow: ${styles.shadows.medium};
          }
        `}
      </style>
      <div
        style={{
          ...createGlassEffect(0.08, 16),
          borderRadius: `${styles.borderRadius.xl} ${styles.borderRadius.xl} 0 0`,
          padding: styles.spacing.xl,
          borderBottom: `1px solid ${colors.interactive.border}`,
          background: colors.gradients.surface,
        }}
      >
        <div
          style={{
            fontSize: styles.typography.fontSizes.sm,
            fontWeight: styles.typography.fontWeights.semibold,
            color: colors.text.primary,
            marginBottom: styles.spacing.md,
            display: 'flex',
            alignItems: 'center',
            gap: styles.spacing.sm,
          }}
        >
          <span>Online Users</span>
          <span
            style={{
              background: colors.gradients.primary,
              color: colors.text.light,
              fontSize: styles.typography.fontSizes.xs,
              padding: `2px ${styles.spacing.sm}`,
              borderRadius: styles.borderRadius.full,
              fontWeight: styles.typography.fontWeights.medium,
              minWidth: '20px',
              textAlign: 'center',
            }}
          >
            {users.length}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: styles.spacing.sm,
          }}
        >
          {users.map((user, index) => (
            <span
              key={user}
              className="user-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: styles.spacing.sm,
                padding: `${styles.spacing.sm} ${styles.spacing.md}`,
                borderRadius: styles.borderRadius.full,
                fontSize: styles.typography.fontSizes.xs,
                fontWeight: styles.typography.fontWeights.medium,
                color: colors.text.primary,
                background: createGlassEffect(0.12, 8).background,
                backdropFilter: 'blur(8px) saturate(140%)',
                WebkitBackdropFilter: 'blur(8px) saturate(140%)',
                border: `1px solid ${colors.interactive.border}`,
                transition: `all ${animations.duration.fast} ${animations.timing.easeInOut}`,
                cursor: 'default',
                animation: `slideIn ${animations.duration.normal} ${animations.timing.easeOut}`,
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: colors.status.online,
                  boxShadow: `0 0 6px ${colors.status.online}`,
                  animation: 'pulse 2s infinite',
                }}
              />
              {user}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}