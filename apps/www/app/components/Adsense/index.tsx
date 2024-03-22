import { FC, useEffect, useState } from 'react';

import { adStyle } from './style.css';
import { Env } from '../Env';

export enum ADSENSE_IDS {
  HOME_MIDDLE = '5708290274',
  POST_BOTTOM = '2832620517',
  TOP_BOTTOM = '5833329650',
  TOP_MIDDLE = '3474759621',
}

export type WindowWithEnv = Window &
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
    typeof window !== 'undefined' ? (window as WindowWithEnv) : undefined;
  const [show, setShow] = useState(false);

  useEffect(() => {
    // if (!w?.env?.VITE_GA_ADSENSE_ID) return;
    // // if (w.adsbygoogle && w.env.NODE_ENV !== 'development') {
    // if (w?.adsbygoogle) {
    //   w.adsbygoogle.push({});
    // }
    setShow(true);
  }, [w?.adsbygoogle, w?.env?.VITE_GA_ADSENSE_ID]);

  if (!show) return;

  return (
    <div className={adStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={w?.env.VITE_GA_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
