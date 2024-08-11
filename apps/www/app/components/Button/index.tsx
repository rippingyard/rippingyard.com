import clsx from 'clsx';
import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';

import { IconLoader } from '~/assets/icons/Loader';

import {
  buttonStyle,
  disabledStyle,
  ghostButtonStyle,
  loadingStyle,
  squareButtonStyle,
  successButtonStyle,
} from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
  color?: 'default' | 'success';
  isGhost?: boolean;
  isSquare?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, isLoading, color, isGhost = false, isSquare = false, ...props },
    ref
  ) => {
    const className = clsx(
      buttonStyle,
      isLoading && loadingStyle,
      color === 'success' && successButtonStyle,
      isGhost && ghostButtonStyle,
      isSquare && squareButtonStyle,
      props?.disabled && disabledStyle
    );

    return (
      <button ref={ref} {...props} className={className}>
        {(isLoading && <IconLoader />) || children}
      </button>
    );
  }
);
