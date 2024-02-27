import { FC, ReactNode, memo } from 'react';

import { dottedBackgroundStyle } from '~/styles/pattern.css';

import { containerStyle, innerStyle, partialStyle } from './style.css';

type Props = {
  children: ReactNode;
  level?: 'section' | 'partial';
};

const HeadingComponent: FC<Props> = ({ children, level = 'section' }) => {
  return (
    <>
      {level === 'section' && (
        <header className={containerStyle}>
          <h2 className={`${innerStyle} ${dottedBackgroundStyle}`}>
            {children}
          </h2>
        </header>
      )}
      {level === 'partial' && <h3 className={partialStyle}>{children}</h3>}
    </>
  );
};

export const Heading = memo(HeadingComponent);
