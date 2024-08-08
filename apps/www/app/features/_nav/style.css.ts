import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';
import { size, zIndex } from '~/utils/style';

export const wrapperStyle = style({
  position: 'fixed',
  top: '-100dvh',
  left: 0,
  width: '100dvw',
  height: '100dvh',
  backgroundColor: vars.color.secondry,
  zIndex: zIndex('FIXED_NAV'),
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  transition: 'top 0.2s ease-in-out',
  padding: `90px 24px 24px`,
  opacity: 0,
});

export const containerStyle = style({
  maxWidth: size('MAIN'),
  margin: 'auto',
});

export const openStyle = style({
  top: 0,
  opacity: 1,
});
