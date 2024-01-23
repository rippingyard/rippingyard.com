import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  paddingTop: 72,
});

export const headerContainerStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: vars.color.background,
  zIndex: zIndex('FIXED_HEADER'),
});

export const headerInnerStyle = style({
  margin: '16px 24px 0',
  paddingBottom: 16,
  borderBottom: `2px solid ${vars.color.primary}`,
  // borderBottom: `1px dotted ${cyan()}`,
  width: 'calc(100% - 48px)',
  backgroundColor: vars.color.background,
});

export const logoStyle = style({
  width: 20,
  height: 20,
  color: vars.color.primary,
  marginRight: 8,
  marginBottom: 11,
});

export const logoTypeStyle = style({
  width: 75,
  height: 30,
  color: vars.color.primary,
});
