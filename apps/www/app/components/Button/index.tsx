import {
  ComponentPropsWithRef,
  FC,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react';

import { IconLoader } from '~/assets/icons/Loader';

import {
  buttonStyle,
  ghostButtonStyle,
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

export const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (
    { children, isLoading, color, isGhost = false, isSquare = false, ...props },
    ref
  ) => {
    const className = useMemo(() => {
      const classes = [buttonStyle];

      if (color === 'success') classes.push(successButtonStyle);
      if (isGhost) classes.push(ghostButtonStyle);
      if (isSquare) classes.push(squareButtonStyle);

      return classes.join(' ');
    }, [color, isGhost, isSquare]);

    return (
      <button ref={ref} {...props} className={className}>
        {(isLoading && <IconLoader />) || children}
      </button>
    );
  }
);
