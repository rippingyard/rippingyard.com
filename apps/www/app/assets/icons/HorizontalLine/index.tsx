import clsx from 'clsx';
import { FC } from 'react';

import { iconStyle } from '~/styles/icon.css';

export const IconHorizontalLine: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      className={clsx(iconStyle)}
    >
      <path
        d="M0 336c0 26.5 21.5 48 48 48l544 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48l-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0c-26.5 0-48 21.5-48 48L0 336z"
        fill="currentColor"
      />
    </svg>
  );
};
