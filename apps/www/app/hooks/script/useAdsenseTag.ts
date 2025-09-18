import { useEffect } from 'react';

export const useAdsenseTag = (adsenseId: string) => {
  useEffect(() => {
    if (!adsenseId) return;

    const script: HTMLScriptElement & {
      'data-adbreak-test'?: 'on';
    } = document.createElement('script');

    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    if (process.env.NODE_ENV !== 'production')
      script['data-adbreak-test'] = 'on';

    document?.head?.appendChild(script);

    return () => {
      if (!document?.head?.contains(script)) return;
      document?.head?.removeChild(script);
    };
  }, [adsenseId]);
};
