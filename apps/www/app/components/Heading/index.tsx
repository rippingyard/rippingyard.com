import clsx from 'clsx';
import { FC, ReactNode, memo } from 'react';

import { dottedBackgroundStyle } from '~/styles/pattern.css';

import {
  containerStyle,
  innerStyle,
  partialStyle,
  wideStyle,
} from './style.css';

type Props = {
  children: ReactNode;
  level?: 'section' | 'partial';
  isWide?: boolean;
};

const HeadingComponent: FC<Props> = ({
  children,
  level = 'section',
  isWide = false,
}) => {
  return (
    <>
      {level === 'section' && (
        <header className={clsx(containerStyle, isWide && wideStyle)}>
          <h2 className={clsx(innerStyle, dottedBackgroundStyle)}>
            {children}
          </h2>
        </header>
      )}
      {level === 'partial' && <h3 className={partialStyle}>{children}</h3>}
    </>
  );
};

export const Heading = memo(HeadingComponent);
