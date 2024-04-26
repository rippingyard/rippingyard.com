import clsx from 'clsx';
import { FC } from 'react';

import { iconStyle } from '~/styles/icon.css';

export const IconItalic: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(iconStyle)}
      viewBox="0 0 384 512"
    >
      <path
        d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"
        fill="currentColor"
      />
    </svg>
  );
};
