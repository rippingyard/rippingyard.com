import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from 'react';

import { LoaderIcon } from '~/assets/icons/Loader';

import { buttonStyle } from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
  children: ReactNode;
};

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ children, isLoading, ...props }, ref) => {
    return (
      <button ref={ref} {...props} className={buttonStyle}>
        {(isLoading && <LoaderIcon />) || children}
      </button>
    );
  }
);
