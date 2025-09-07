import { FC, ReactNode } from 'react';

import * as styles from './style.css';

type Props = {
  items: ReactNode[];
  name: string;
};

export const Buttons: FC<Props> = ({ items = [], name }) => {
  return (
    <ul className={styles.container}>
      {items.map((item, i) => (
        <li className={styles.item} key={`${name}-button-item-${i}`}>
          {item}
        </li>
      ))}
    </ul>
  );
};
