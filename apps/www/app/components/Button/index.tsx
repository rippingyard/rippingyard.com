import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from 'react';

import { buttonStyle } from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  children: ReactNode;
};

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props} className={buttonStyle}>
        {children}
      </button>
    );
  }
);
