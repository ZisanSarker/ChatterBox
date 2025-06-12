export const animations = {
  duration: {
    fast: '120ms',
    normal: '220ms',
    slow: '320ms',
    slower: '450ms',
  },
  timing: {
    easeInOut: 'cubic-bezier(0.4,0,0.2,1)',
    easeOut: 'cubic-bezier(0,0,0.2,1)',
    easeIn: 'cubic-bezier(0.4,0,1,1)',
    bounce: 'cubic-bezier(0.68,-0.55,0.265,1.55)',
    spring: 'cubic-bezier(0.175,0.885,0.32,1.275)',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeInUp: {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    typingBounce: {
      '0%, 60%, 100%': { transform: 'translateY(0)' },
      '30%': { transform: 'translateY(-7px)' },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.7 },
    },
  },
} as const;