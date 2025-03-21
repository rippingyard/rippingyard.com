﻿import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigation } from 'react-router';

import { Nav } from '~/features/nav';

import { PostDialogButton } from './PostDialogButton';
import { PostModal } from './PostModal';
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
  ComponentPropsWithoutRef<'div'> & {
    isAuthenticated: boolean;
    isWriting?: boolean;
  }
> = ({ children, isAuthenticated = false, isWriting = false }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const { state } = useNavigation();

  const toggleNav = useCallback(() => setIsOpened(!isOpened), [isOpened]);

  useEffect(() => {
    if (state === 'loading') setIsOpened(false);
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
      <PostModal isOpen={isPosting} onClose={() => setIsPosting(false)} />
      {!isWriting && (
        <PostDialogButton
          isAuthenticated={isAuthenticated}
          onClick={() => setIsPosting(true)}
        />
      )}
    </div>
  );
};
