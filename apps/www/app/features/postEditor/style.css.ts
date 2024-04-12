import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const containerStyle = style({
  position: 'relative',
  height: '100%',
});

export const headerStyle = style({
  marginBottom: 32,
  flexShrink: 0,
});

export const bodyStyle = style({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  overflowX: 'hidden',
  // overflowY: 'auto',
  paddingBottom: 90,
  height: '100%',
});

export const footerStyle = style({
  position: 'fixed',
  bottom: 0,
  padding: '16px 0',
  borderTop: `1px solid ${vars.color.shadow}`,
  backgroundColor: vars.color.background,
  // width: '100%',
  // maxWidth: size('MAIN'),
});
