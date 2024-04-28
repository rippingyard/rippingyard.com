import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { activeButtonStyle, buttonStyle } from './style.css';

type Props = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const MenuButton: FC<Props> = ({
  isActive = false,
  onClick,
  children,
}) => {
  const className = clsx(buttonStyle, isActive && activeButtonStyle);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={className}
    >
      {children}
    </button>
  );
};
