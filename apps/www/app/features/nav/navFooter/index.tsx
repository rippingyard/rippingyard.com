import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router';

import { IconLogout } from '~/assets/icons/Logout';

import * as styles from './style.css';

type Props = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

export const NavFooter: FC<Props> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to="terms">利用規約</Link>
        </li>
        <li className={styles.listItem}>
          <Link to="privacy">プライバシーポリシー</Link>
        </li>
      </ul>
      {isAuthenticated && (
        <ul className={styles.list}>
          <li
            onClick={onLogout}
            className={clsx(styles.listItem, styles.clickable)}
          >
            <IconLogout /> ログアウト
          </li>
        </ul>
      )}
    </div>
  );
};
