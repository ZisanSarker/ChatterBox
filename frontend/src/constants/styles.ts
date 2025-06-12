import { colors } from './colors';
import { animations } from './animations';

export const styles = {
  shadows: {
    small: '0 2px 6px rgba(0,0,0,0.09)',
    medium: '0 4px 18px rgba(0,0,0,0.15)',
    large: '0 8px 36px rgba(0,0,0,0.18)',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    xxl: '30px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '30px',
    xxl: '40px',
    xxxl: '52px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.9rem',
      base: '1.04rem',
      lg: '1.22rem',
      xl: '1.4rem',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.22',
      normal: '1.5',
      relaxed: '1.7',
    },
  },
  components: {
    button: {
      primary: {
        background: colors.gradients.accent,
        color: colors.text.light,
        border: 'none',
        borderRadius: '10px',
        padding: '12px 0',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '1.05rem',
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.12)',
      },
      secondary: {
        background: colors.gradients.glassLight,
        color: colors.text.primary,
        border: `1px solid ${colors.interactive.border}`,
        borderRadius: '8px',
        padding: '12px 32px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
      },
    },
    input: {
      primary: {
        background: colors.gradients.glassLight,
        border: `1px solid ${colors.interactive.border}`,
        borderRadius: '8px',
        padding: '12px 16px',
        color: colors.text.primary,
        fontSize: '1rem',
        fontWeight: 500,
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
        outline: 'none',
        boxShadow: 'none',
      },
    },
  },
};

export const createGlassEffect = (opacity = 0.14, blur = 22): React.CSSProperties => ({
  background: `rgba(30,30,36,${opacity})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: `1px solid ${colors.interactive.border}`,
});