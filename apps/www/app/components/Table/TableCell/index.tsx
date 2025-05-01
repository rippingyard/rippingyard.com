import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

import { tdStyle } from './style.css';

type Props = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'td'>;

export const TableCell: FC<Props> = ({ children, className, ...props }) => {
  return (
    <td className={clsx(tdStyle, className)} {...props}>
      {children}
    </td>
  );
};
