import { Link, useSubmit } from '@remix-run/react';
import { ComponentPropsWithoutRef, FC, useCallback } from 'react';

import {
  containerStyle,
  headerContainerStyle,
  headerInnerStyle,
  logoLinkStyle,
  logoStyle,
  logoTypeStyle,
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
  }, [submit]);

  return (
    <div className={containerStyle}>
      <header className={headerContainerStyle}>
        <div className={headerInnerStyle}>
          <Link to="/" className={logoLinkStyle}>
            <Logo style={logoStyle} />
            <LogoType style={logoTypeStyle} />
          </Link>
          {isAuthenticated && <button onClick={onLogout}>ログアウト</button>}
        </div>
      </header>
      {children}
    </div>
  );
};
