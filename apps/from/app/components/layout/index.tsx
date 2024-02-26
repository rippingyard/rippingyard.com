import { css } from '@emotion/react';
import { Link } from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import {
  ComponentPropsWithoutRef,
  FC,
} from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

import { cyan, white, zIndex } from '~/utils/style';

import { Logo } from '../logo';
import { LogoType } from '../logoType';

export const Layout: FC<ComponentPropsWithoutRef<'div'>> = ({ children }) => {
  return (
    <div css={containerStyle}>
      <header css={headerContainerStyle}>
        <div css={headerInnerStyle}>
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
