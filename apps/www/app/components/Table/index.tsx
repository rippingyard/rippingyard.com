import { FC, memo, ReactNode } from 'react';

import {
  checkboxContainerStyle,
  containerStyle,
  itemStyle,
  thStyle,
} from './style.css';
import { TableCell } from './TableCell';
import { FormCheckbox } from '../FormCheckbox';

export type TableItem = {
  value: Record<string, ReactNode>;
  isChecked: boolean;
};

type Props = {
  columns: {
    key: string;
    label?: string;
    width?: number;
  }[];
  items: TableItem[];
  meta?: {
    checkbox?: {
      key: string;
      isCheckedAll: boolean;
      onClick: (item: TableItem) => void;
      onClickForAll: () => void;
    };
  };
};

export const Table: FC<Props> = memo(({ columns, items = [], meta = {} }) => {
  console.log('items', items);

  const { checkbox } = meta;

  return (
    <table className={containerStyle}>
      <thead>
        {checkbox && (
          <th className={thStyle}>
            <FormCheckbox
              onClick={checkbox.onClickForAll}
              checked={checkbox.isCheckedAll ?? false}
            />
          </th>
        )}
        {columns.map(({ key, label, width = 'auto' }) => (
          <th
            key={`table-header_${key}`}
            className={thStyle}
            style={{ width: width }}
          >
            {label ?? key}
          </th>
        ))}
      </thead>
      {items.map((item, i) => (
        <tr key={`table-row_${i}`} className={itemStyle}>
          {checkbox && (
            <TableCell>
              <div className={checkboxContainerStyle}>
                <FormCheckbox
                  onClick={() => checkbox.onClick(item)}
                  checked={item.isChecked}
                />
              </div>
            </TableCell>
          )}
          {columns.map(({ key }, ii) => (
            <TableCell key={`table-cell_${i}_${ii}`}>
              {item.value[key]}
            </TableCell>
          ))}
        </tr>
      ))}
    </table>
  );
});
