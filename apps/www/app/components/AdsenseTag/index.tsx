import { FC, memo, useEffect, useState } from 'react';

const AdsenseTagComponent: FC<{
  adsenseId: string;
}> = ({ adsenseId }) => {
  const [showAdsenseTag, setShowAdsenseTag] = useState(false);

  useEffect(() => {
    if (!adsenseId) return;
    setShowAdsenseTag(true);
  }, [adsenseId]);

  if (!showAdsenseTag) return;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
    />
  );
};

export const AdsenseTag = memo(AdsenseTagComponent);
