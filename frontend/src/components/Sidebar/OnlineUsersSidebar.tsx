import React from 'react';
import { styles } from '../../constants/styles';
import { colors } from '../../constants/colors';

interface Props {
  users: string[];
}
const OnlineUsersSidebar: React.FC<Props> = ({ users }) => (
  <aside
    style={{
      minWidth: 220,
      background: colors.gradients.glassDark,
      borderRight: `1px solid ${colors.interactive.border}`,
      padding: styles.spacing.lg,
      display: 'flex',
      flexDirection: 'column',
      gap: styles.spacing.md,
      height: '100vh',
    }}
  >
    <h2
      style={{
        color: colors.text.secondary,
        marginBottom: styles.spacing.lg,
        fontSize: styles.typography.fontSizes.base,
        fontWeight: styles.typography.fontWeights.semibold,
      }}
    >
      Online Users ({users.length})
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.sm }}>
      {users.map((u) => (
        <span
          key={u}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: colors.glass.primary,
            padding: '8px 12px',
            borderRadius: styles.borderRadius.full,
            color: colors.text.primary,
            fontWeight: 500,
            fontSize: styles.typography.fontSizes.sm,
          }}
        >
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: colors.status.online,
              marginRight: 6,
            }}
          />
          {u}
        </span>
      ))}
    </div>
  </aside>
);

export default OnlineUsersSidebar;