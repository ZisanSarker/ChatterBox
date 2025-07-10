import { styles, createGlassEffect } from '../../constants/styles';
import { colors } from '../../constants/colors';

interface Props {
  users: string[];
}
export default function OnlineUsersTopbar({ users }: Props) {
  const shownUsers = users.slice(0, 5);
  const othersCount = users.length - shownUsers.length;

  return (
    <div
      style={{
        ...createGlassEffect(0.13, 14),
        display: 'flex',
        alignItems: 'center',
        gap: styles.spacing.md,
        padding: `${styles.spacing.md} ${styles.spacing.lg}`,
        borderRadius: styles.borderRadius.xl,
        margin: styles.spacing.md,
        background: colors.gradients.surface,
        overflowX: 'auto',
      }}
    >
      {shownUsers.map((u) => (
        <span
          key={u}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: colors.text.primary,
            background: colors.glass.primary,
            borderRadius: styles.borderRadius.full,
            padding: '4px 12px',
            fontSize: styles.typography.fontSizes.xs,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: colors.status.online,
              marginRight: 3,
            }}
          />
          {u}
        </span>
      ))}
      {othersCount > 0 && (
        <span
          style={{
            marginLeft: styles.spacing.sm,
            color: colors.text.accent,
            fontWeight: 600,
            fontSize: styles.typography.fontSizes.xs,
            background: colors.glass.primary,
            padding: '4px 10px',
            borderRadius: styles.borderRadius.full,
          }}
        >+{othersCount} others</span>
      )}
    </div>
  );
}