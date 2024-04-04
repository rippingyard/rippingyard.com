import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const containerStyle = style({
  position: 'relative',
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'space-between',
  height: '100%',
  // overflow: 'hidden',
});

export const headerStyle = style({
  marginBottom: 32,
});

export const bodyStyle = style({
  // flexGrow: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
  paddingBottom: 90,
});

export const footerStyle = style({
  position: 'fixed',
  bottom: 0,
  padding: '16px 0',
  borderTop: `1px solid ${vars.color.shadow}`,
  // width: '100%',
  backgroundColor: vars.color.background,
});
