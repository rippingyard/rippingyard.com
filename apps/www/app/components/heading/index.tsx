import { FC, ReactNode, memo } from 'react';

import { containerStyle } from './style.css';

type Props = {
  children: ReactNode;
};

const HeadingComponent: FC<Props> = ({ children }) => {
  return <h2 className={containerStyle}>{children}</h2>;
};

export const Heading = memo(HeadingComponent);
