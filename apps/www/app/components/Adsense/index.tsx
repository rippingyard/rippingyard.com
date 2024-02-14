import React, { FC, useEffect, useState } from 'react';

import { Env } from '../Env';

type WindowWithAdsense = Window &
  typeof globalThis & {
    adsbygoogle: {
      push: (_: unknown) => void;
    };
    env: Env;
  };

type Props = {
  slot: string;
};

export const Adsense: FC<Props> = ({ slot }) => {
  const w =
    typeof window !== 'undefined' ? (window as WindowWithAdsense) : undefined;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!w || !w?.env?.VITE_GA_ADSENSE_ID) return;
    if (w.adsbygoogle && w.env.NODE_ENV !== 'development') {
      w.adsbygoogle.push({});
    }
    setShow(true);
  }, [w]);

  if (!show) return;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={w?.env.VITE_GA_ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
