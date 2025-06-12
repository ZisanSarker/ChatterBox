import { useState, useEffect } from 'react';
import { breakpoints } from '../constants/breakpoints';

export function useResponsive() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.laptop,
    isLaptop: width >= breakpoints.laptop && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
    width,
  };
}