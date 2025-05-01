import { FC, ReactNode } from 'react';

import * as styles from './style.css';

type Props = {
  items: ReactNode[];
};

export const Buttons: FC<Props> = ({ items = [] }) => {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <li className={styles.item}>{item}</li>
      ))}
    </ul>
  );
};
