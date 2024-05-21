import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { mediaQuery, zIndex } from '~/utils/style';

export const containerStyle = style({
  height: '100%',
  paddingTop: 66,
  // paddingBottom: 100,
});

export const headerContainerStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  // backgroundColor: vars.color.background,
  zIndex: zIndex('FIXED_HEADER'),
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
});

export const headerInnerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '16px 24px 0',
  paddingBottom: 16,
  borderBottom: `2px solid ${vars.color.neutral}`,
  // borderBottom: `1px dotted ${cyan()}`,
  width: 'calc(100% - 48px)',
  // backgroundColor: vars.color.background,
  '@media': {
    [mediaQuery('SP')]: {
      margin: '16px 16px 0',
      width: 'calc(100% - 32px)',
    },
  },
});

export const logoStyle = style({
  width: 20,
  height: 20,
  color: vars.color.neutral,
  marginRight: 8,
  marginBottom: 11,
});

export const logoTypeStyle = style({
  width: 75,
  height: 30,
  color: vars.color.neutral,
});

export const logoLinkStyle = style({
  display: 'inline-block',
});
