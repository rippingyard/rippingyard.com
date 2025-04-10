import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { mediaQuery, size } from '~/utils/style';

export const containerStyle = style({
  position: 'relative',
  height: '100%',
});

export const headerStyle = style({
  // marginBottom: 32,
  padding: '0 0 32px',
  flexShrink: 0,
});

export const headerTitleStyle = style({
  // marginBottom: 16,
  borderBottom: `1px solid ${vars.color.shadow}`,
});

export const bodyStyle = style({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  overflowX: 'hidden',
  // overflowY: 'auto',
  paddingBottom: 65,
});

export const footerStyle = style({
  display: 'flex',
  gap: 16,
  position: 'fixed',
  bottom: 0,
  padding: '16px 0',
  borderTop: `1px solid ${vars.color.shadow}`,
  backgroundColor: vars.color.background,
  width: 'calc(100% - (24px * 2))',
  maxWidth: size('MAIN') - 24 * 2,
  '@media': {
    [mediaQuery('SP')]: {
      width: 'calc(100% - (16px * 2))',
    },
  },
});
