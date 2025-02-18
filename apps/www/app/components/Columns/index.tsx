import { FC, ReactNode } from 'react';

import { columnStyle, containerStyle } from './style.css';

type Props = {
  columns: {
    component: ReactNode;
    width?: string;
  }[];
};

export const Columns: FC<Props> = ({ columns = [] }) => {
  if (columns.length === 0) return null;
  return (
    <div className={containerStyle}>
      {columns.map((column) => (
        <div className={columnStyle} style={{ width: column.width || '50%' }}>
          {column.component}
        </div>
      ))}
    </div>
  );
};
