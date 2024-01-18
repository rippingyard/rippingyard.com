import { Link } from '@remix-run/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import {
  containerStyle,
  headerContainerStyle,
  headerInnerStyle,
  logoStyle,
  logoTypeStyle,
} from './style.css';
import { Logo } from '../logo';
import { LogoType } from '../logoType';

export const Layout: FC<ComponentPropsWithoutRef<'div'>> = ({ children }) => {
  return (
    <div className={containerStyle}>
      <header className={headerContainerStyle}>
        <div className={headerInnerStyle}>
          <Link to="/">
            <Logo style={logoStyle} />
            <LogoType style={logoTypeStyle} />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};
