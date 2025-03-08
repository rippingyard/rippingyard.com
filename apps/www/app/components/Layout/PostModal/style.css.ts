import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: zIndex('MODAL'),
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const innerStyle = style({
  minHeight: '60vh',
  minWidth: '60vw',
  backgroundColor: vars.color.background,
  borderRadius: rootVars.border.radius.large,
  zIndex: 1,
});

export const backdropStyle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
