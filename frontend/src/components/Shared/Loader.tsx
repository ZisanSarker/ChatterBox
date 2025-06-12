import React from 'react';
import { colors } from '../../constants/colors';

const Loader: React.FC<{ text?: string; isError?: boolean }> = ({ text = 'Loading...', isError }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isError ? '#ef4444' : colors.text.secondary,
      fontSize: '1.2rem',
      background: colors.gradients.darkBackground,
    }}
  >
    <span>{text}</span>
  </div>
);
export default Loader;