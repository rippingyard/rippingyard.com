﻿import { Link, useNavigation } from '@remix-run/react';
import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Nav } from '~/features/_nav';

import {
  containerStyle,
  headerContainerStyle,
  headerInnerStyle,
  logoLinkStyle,
  logoStyle,
  logoTypeStyle,
  menuButtonStyle,
} from './style.css';
import { Logo } from '../Logo';
import { LogoType } from '../LogoType';

export const Layout: FC<
  ComponentPropsWithoutRef<'div'> & { isAuthenticated: boolean }
> = ({ children, isAuthenticated }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { state } = useNavigation();

  const toggleNav = useCallback(() => setIsOpened(!isOpened), [isOpened]);

  useEffect(() => {
    state === 'loading' && setIsOpened(false);
  }, [state]);

  return (
    <div className={containerStyle}>
      <header className={headerContainerStyle}>
        <div className={headerInnerStyle}>
          <Link to="/" className={logoLinkStyle}>
            <Logo style={logoStyle} />
            <LogoType style={logoTypeStyle} />
          </Link>
          <button className={menuButtonStyle} onClick={toggleNav}>
            Menu
          </button>
        </div>
      </header>
      {children}
      <Nav isOpened={isOpened} isAuthenticated={isAuthenticated} />
    </div>
  );
};
