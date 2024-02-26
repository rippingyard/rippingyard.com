import { FC, ReactNode, memo } from 'react';

import { dottedBackgroundStyle } from '~/styles/pattern.css';

import { containerStyle, innerStyle } from './style.css';

type Props = {
  children: ReactNode;
};

const HeadingComponent: FC<Props> = ({ children }) => {
  return (
    <header className={containerStyle}>
      <h2 className={`${innerStyle} ${dottedBackgroundStyle}`}>{children}</h2>
    </header>
  );
};

export const Heading = memo(HeadingComponent);
