import clsx from 'clsx';
import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';

import { IconLoader } from '~/assets/icons/Loader';

import {
  buttonStyle,
  disabledStyle,
  ghostButtonStyle,
  loadingStyle,
  rollingButtonStyle,
  squareButtonStyle,
  successButtonStyle,
  wideButtonStyle,
} from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
  color?: 'default' | 'success';
  isWide?: boolean;
  isGhost?: boolean;
  isSquare?: boolean;
  isRolling?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      isLoading,
      color,
      isGhost = false,
      isSquare = false,
      isWide = false,
      isRolling = false,
      ...props
    },
    ref
  ) => {
    const className = clsx(
      buttonStyle,
      isLoading && loadingStyle,
      color === 'success' && successButtonStyle,
      isGhost && ghostButtonStyle,
      isSquare && squareButtonStyle,
      isWide && wideButtonStyle,
      isRolling && rollingButtonStyle,
      props?.disabled && disabledStyle
    );

    return (
      <button ref={ref} {...props} className={className}>
        {(isLoading && <IconLoader />) || children}
      </button>
    );
  }
);
