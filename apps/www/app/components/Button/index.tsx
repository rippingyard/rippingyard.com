import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react';

import { IconLoader } from '~/assets/icons/Loader';

import * as styles from './style.css';

// import {
//   blurButtonStyle,
//   buttonStyle,
//   disabledStyle,
//   ghostButtonStyle,
//   loadingIconStyle,
//   loadingStyle,
//   squareButtonStyle,
//   successButtonStyle,
//   wideButtonStyle,
// } from './style.css';

type Props = ComponentPropsWithRef<'button'> & {
  isLoading?: boolean;
  color?: 'default' | 'success';
  size?: keyof typeof styles.size;
  isWide?: boolean;
  isGhost?: boolean;
  isSquare?: boolean;
  isBlur?: boolean;
  isNoPadding?: boolean;
  children: ReactNode;
};

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  {
    children,
    isLoading,
    color,
    size = 'medium',
    isGhost = false,
    isSquare = false,
    isWide = false,
    isBlur = false,
    isNoPadding = false,
    ...props
  },
  ref
) => {
  const className = clsx(
    styles.button,
    isLoading && styles.loading,
    color === 'success' && styles.success,
    styles.size[size],
    isGhost && styles.ghost,
    isSquare && styles.square,
    isWide && styles.wide,
    isBlur && styles.blurred,
    isNoPadding && styles.noPadding,
    props?.disabled && styles.blurred
  );

  return (
    <button ref={ref} {...props} className={className}>
      {isLoading && (
        <div className={styles.loadingIcon}>
          <IconLoader />
        </div>
      )}
      <div>{children}</div>
    </button>
  );
};

export const Button = forwardRef<HTMLButtonElement, Props>(ButtonComponent);
