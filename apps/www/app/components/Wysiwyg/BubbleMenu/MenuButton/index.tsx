import { FC, ReactNode, useMemo } from 'react';

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
  const className = useMemo(() => {
    const classes = [buttonStyle];
    if (isActive) classes.push(activeButtonStyle);
    return classes.join(' ');
  }, [isActive]);

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
