import { useEffect } from 'react';

export const useAdsenseTag = (adsenseId: string) => {
  useEffect(() => {
    if (!adsenseId) return;

    const script = document.createElement('script');

    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [adsenseId]);
};
