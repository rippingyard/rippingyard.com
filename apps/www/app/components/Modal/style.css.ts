import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { size } from '~/utils/style';

export const backdropStyle = style({
  width: '100vw',
  height: '100dvh',
  display: 'grid',
  placeContent: 'center',
  backgroundColor: vars.color['shadow-20'],
  position: 'fixed',
  top: 0,
  left: 0,
  cursor: 'pointer',
});

export const containerStyle = style({
  position: 'relative',
  maxWidth: size('MAIN'),
  backgroundColor: vars.color.background,
  borderRadius: rootVars.border.radius.normal,
  boxShadow: `0px 3px 8px ${vars.color['shadow-40']}`,
  cursor: 'default',
});

export const closeButtonStyle = style({
  position: 'absolute',
  right: 0,
  top: '-1.5rem',
  lineHeight: '1rem',
  cursor: 'pointer',
  color: vars.color.neutral,
  fontSize: '1.2rem',
  ':hover': {
    color: vars.color.primary,
  },
});

export const closedStyle = style({
  display: 'none',
});
