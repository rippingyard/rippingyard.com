import { css } from '@emotion/react';
import { ComponentPropsWithoutRef, FC } from 'react';

import { cyan, white, zIndex } from '~/utils/style';

import { Logo } from '../logo';
import { LogoType } from '../logoType';
import Link from 'next/link';

export const Layout: FC<ComponentPropsWithoutRef<'div'>> = ({ children }) => {
  return (
    <div css={containerStyle}>
      <header css={headerContainerStyle}>
        <div css={headerInnerStyle}>
          <Link href="/">
            <Logo style={logoStyle} />
            <LogoType style={logoTypeStyle} />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

const containerStyle = css({
  paddingTop: 72,
});

const headerContainerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: white(),
  zIndex: zIndex('FIXED_HEADER'),
});

const headerInnerStyle = css({
  margin: '16px 24px 0',
  paddingBottom: 16,
  borderBottom: `2px solid ${cyan()}`,
  // borderBottom: `1px dotted ${cyan()}`,
  width: 'calc(100% - 48px)',
  backgroundColor: white(),
});

const logoStyle = css({
  width: 20,
  height: 20,
  color: cyan(),
  marginRight: 8,
  marginBottom: 11,
});

const logoTypeStyle = css({
  width: 75,
  height: 30,
  color: cyan(),
});
