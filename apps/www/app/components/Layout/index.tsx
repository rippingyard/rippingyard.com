import { Link, useSubmit } from '@remix-run/react';
import { ComponentPropsWithoutRef, FC, useCallback } from 'react';

import { clearCachedItems } from '~/hooks/cache/useCache';

import {
  containerStyle,
  headerContainerStyle,
  headerInnerStyle,
  logoLinkStyle,
  logoStyle,
  logoTypeStyle,
  menuContainerStyle,
  menuItemStyle,
} from './style.css';
import { Logo } from '../Logo';
import { LogoType } from '../LogoType';

export const Layout: FC<
  ComponentPropsWithoutRef<'div'> & { isAuthenticated: boolean }
> = ({ children, isAuthenticated }) => {
  const submit = useSubmit();

  const onLogout = useCallback(async () => {
    await submit(
      {},
      {
        method: 'POST',
        action: '/logout',
        navigate: false,
      }
    );
    clearCachedItems();
  }, [submit]);

  return (
    <div className={containerStyle}>
      <header className={headerContainerStyle}>
        <div className={headerInnerStyle}>
          <Link to="/" className={logoLinkStyle}>
            <Logo style={logoStyle} />
            <LogoType style={logoTypeStyle} />
          </Link>
          {isAuthenticated && (
            <ul className={menuContainerStyle}>
              <li>
                <Link className={menuItemStyle} to="/home" prefetch="render">
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  className={menuItemStyle}
                  to="/post/create"
                  prefetch="render"
                >
                  記事投稿
                </Link>
              </li>
              <li>
                <button className={menuItemStyle} onClick={onLogout}>
                  ログアウト
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};
