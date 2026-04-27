'use client'

import { useEffect } from 'react';

export function useDisableScroll(disabled: boolean) {
  useEffect(() => {
    if (disabled) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [disabled]);
}