import { useEffect } from 'react';

export const usePreventScroll = (on: boolean) => {
  useEffect(() => {
    if (!on) {
      document.body.style.overflow = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [on]);
};
