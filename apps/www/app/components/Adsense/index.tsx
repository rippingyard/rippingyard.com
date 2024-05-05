import { FC, useEffect, useMemo, useState } from 'react';

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
  const isTest = useMemo(() => process.env.NODE_ENV === 'development', []);

  useEffect(() => {
    if (show) return;
    if (typeof window === 'undefined') return;
    if (!(window as WindowWithEnv)?.adsbygoogle) return;
    try {
      // if (process.env.NODE_ENV !== 'development') w?.adsbygoogle.push({});
      // (window as WindowWithEnv).adsbygoogle.push({});
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  }, [show]);

  if (!show) return;

  return (
    <div className={adStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={w?.env.VITE_GA_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-adtest={isTest ? 'on' : 'off'}
        data-full-width-responsive="true"
      />
    </div>
  );
};
