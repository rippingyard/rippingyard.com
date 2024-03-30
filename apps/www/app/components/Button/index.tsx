import {
  ComponentPropsWithRef,
  FC,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react';

import { IconLoader } from '~/assets/icons/Loader';

import { buttonStyle, successButtonStyle } from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
  color?: 'default' | 'success';
  children: ReactNode;
};

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ children, isLoading, color, ...props }, ref) => {
    const className = useMemo(() => {
      const classes = [buttonStyle];
      if (color === 'success') classes.push(successButtonStyle);
      return classes.join(' ');
    }, [color]);

    return (
      <button ref={ref} {...props} className={className}>
        {(isLoading && <IconLoader />) || children}
      </button>
    );
  }
);
