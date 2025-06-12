import React from 'react';
import { colors } from '../../constants/colors';

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      minWidth: '100vw',
      background: colors.gradients.darkBackground,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

export default PageContainer;