import { colors } from './colors';
import { animations } from './animations';

export interface StylesType {
  glass: {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
    subtle: React.CSSProperties;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
    inset: string;
    glow: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  typography: {
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
    fontWeights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeights: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  components: {
    button: {
      primary: React.CSSProperties;
      secondary: React.CSSProperties;
    };
    input: {
      primary: React.CSSProperties;
    };
  };
}

const styles: StylesType = {
  glass: {
    primary: {
      background: colors.glass.primary,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: `1px solid ${colors.interactive.border}`,
      borderRadius: '16px',
    },
    secondary: {
      background: colors.glass.secondary,
      backdropFilter: 'blur(12px) saturate(160%)',
      WebkitBackdropFilter: 'blur(12px) saturate(160%)',
      border: `1px solid ${colors.interactive.border}`,
      borderRadius: '12px',
    },
    subtle: {
      background: colors.glass.tertiary,
      backdropFilter: 'blur(8px) saturate(140%)',
      WebkitBackdropFilter: 'blur(8px) saturate(140%)',
      borderRadius: '8px',
    },
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    inset: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  },
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  components: {
    button: {
      primary: {
        background: colors.gradients.primary,
        color: colors.text.light,
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
      },
      secondary: {
        background: colors.interactive.secondary,
        color: colors.text.primary,
        border: `1px solid ${colors.interactive.border}`,
        borderRadius: '8px',
        padding: '10px 20px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
    },
    input: {
      primary: {
        background: colors.glass.secondary,
        backdropFilter: 'blur(12px) saturate(160%)',
        WebkitBackdropFilter: 'blur(12px) saturate(160%)',
        border: `1px solid ${colors.interactive.border}`,
        borderRadius: '8px',
        padding: '12px 16px',
        color: colors.text.primary,
        fontSize: '14px',
        transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,
        outline: 'none',
      },
    },
  },
};

export { styles };

// Helper function to create glass effect styles
export const createGlassEffect = (opacity = 0.15, blur = 20): React.CSSProperties => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: `1px solid ${colors.interactive.border}`,
});