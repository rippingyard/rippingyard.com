import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { size, zIndex } from '~/utils/style';

export const wrapper = style({
  position: 'fixed',
  top: '-200dvh',
  left: 0,
  width: '100dvw',
  height: '100dvh',
  backgroundColor: vars.color.secondry,
  zIndex: zIndex('FIXED_NAV'),
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  transition: 'top 0.2s ease-in-out',
  padding: '90px 24px 24px',
  overflow: 'auto',
});

export const container = style({
  maxWidth: size('MAIN'),
  margin: 'auto',
});

export const open = style({
  top: 0,
});
