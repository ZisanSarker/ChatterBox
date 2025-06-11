export const colors = {
  glass: {
    primary: 'rgba(255, 255, 255, 0.15)',
    secondary: 'rgba(255, 255, 255, 0.08)',
    tertiary: 'rgba(255, 255, 255, 0.05)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 69, 199, 0.8) 100%)',
    secondary: 'linear-gradient(135deg, rgba(167, 243, 208, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%)',
    background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.3) 0%, rgba(0, 242, 254, 0.3) 100%)',
    surface: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
  
  message: {
    own: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 69, 199, 0.9) 100%)',
      text: 'rgba(255, 255, 255, 0.95)',
      timestamp: 'rgba(255, 255, 255, 0.7)',
    },
    other: {
      background: 'rgba(255, 255, 255, 0.2)',
      text: 'rgba(17, 24, 39, 0.9)',
      timestamp: 'rgba(107, 114, 128, 0.8)',
      username: 'rgba(99, 102, 241, 0.8)',
    },
  },
  
  status: {
    online: 'rgba(34, 197, 94, 0.9)',
    typing: 'rgba(107, 114, 128, 0.8)',
    offline: 'rgba(156, 163, 175, 0.6)',
  },
  
  interactive: {
    primary: 'rgba(99, 102, 241, 0.9)',
    primaryHover: 'rgba(99, 102, 241, 1)',
    secondary: 'rgba(255, 255, 255, 0.2)',
    secondaryHover: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.2)',
    focus: 'rgba(99, 102, 241, 0.5)',
  },
  
  text: {
    primary: 'rgba(17, 24, 39, 0.9)',
    secondary: 'rgba(75, 85, 99, 0.8)',
    muted: 'rgba(107, 114, 128, 0.7)',
    light: 'rgba(255, 255, 255, 0.9)',
    accent: 'rgba(99, 102, 241, 0.9)',
  },
} as const;

export type Colors = typeof colors;