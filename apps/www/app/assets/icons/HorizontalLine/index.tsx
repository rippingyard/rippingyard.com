import { FC, useMemo } from 'react';

import { iconStyle } from '~/styles/icon.css';

export const IconHorizontalLine: FC = () => {
  const className = useMemo(() => [iconStyle].join(' '), []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 448 512"
    >
      <path
        d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"
        fill="currentColor"
      />
    </svg>
  );
};
