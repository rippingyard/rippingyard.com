import { FC } from 'react';

import { loaderStyle } from './style.css';

const r = 32;

export const IconLoader: FC = () => {
  return (
    <svg
      version="1.1"
      className={loaderStyle}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox={`0 0 ${r * 2} ${r * 2}`}
    >
      <circle className="loading__front" cx={r} cy={r} r={r - 10} />
      <circle className="loading__back" cx={r} cy={r} r={r - 10} />
    </svg>
  );
};
