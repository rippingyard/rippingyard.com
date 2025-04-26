import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigation } from 'react-router';

import { IconLoader } from '~/assets/icons/Loader';
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
  openLogoStyle,
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

  const { state, location } = useNavigation();
  const isNavigating = Boolean(location);

  const toggleNav = useCallback(() => setIsOpened(!isOpened), [isOpened]);

  useEffect(() => {
    if (state === 'loading') setIsOpened(false);
  }, [state]);

  return (
    <div className={containerStyle}>
      <header className={headerContainerStyle}>
        <div className={headerInnerStyle}>
          <Link to="/" className={logoLinkStyle}>
            {(isNavigating && <IconLoader style={logoStyle} />) || (
              <Logo style={clsx(logoStyle, isOpened && openLogoStyle)} />
            )}
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
