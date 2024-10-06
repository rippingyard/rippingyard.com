import { FC, ReactNode } from 'react';

import { tdStyle } from './style.css';

type Props = {
  children: ReactNode;
};

export const TableCell: FC<Props> = ({ children }) => {
  return <td className={tdStyle}>{children}</td>;
};
