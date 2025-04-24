import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { HEADER_HEIGHT, mediaQuery, zIndex } from '~/utils/style';

export const containerStyle = style({
  height: '100%',
  paddingTop: HEADER_HEIGHT,
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
  marginRight: 8,
  marginBottom: 11,
});

globalStyle(`${logoStyle} > .inner`, {
  fill: vars.color.background,
});

export const openLogoStyle = style({});

globalStyle(`${logoStyle}${openLogoStyle} > .inner`, {
  fill: vars.color.secondry,
});

export const logoTypeStyle = style({
  width: 75,
  height: 30,
});

export const logoLinkStyle = style({
  display: 'inline-block',
  color: vars.color.neutral,
  transition: 'color 0.5s ease',
  ':hover': {
    color: vars.color.primary,
  },
});

export const menuButtonStyle = style({
  fontFamily: rootVars.font.family.rich,
  fontSize: rootVars.font.size.small,
  textTransform: 'uppercase',
  ':hover': {
    color: vars.color.primary,
  },
});
