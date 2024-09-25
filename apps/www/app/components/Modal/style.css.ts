import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const wrapperStyle = style({
  width: '100vw',
  height: '100dvh',
  display: 'grid',
  placeContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: zIndex('WYSIWYG_MODAL'),
});

export const backdropStyle = style({
  width: '100vw',
  height: '100dvh',
  backgroundColor: vars.color['shadow-40'],
  position: 'fixed',
  top: 0,
  left: 0,
  cursor: 'pointer',
  zIndex: zIndex('MODAL'),
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
});

export const containerStyle = style({
  position: 'relative',
  maxWidth: '95vw',
  maxHeight: '90dvh',
  backgroundColor: vars.color.background,
  borderRadius: rootVars.border.radius.normal,
  boxShadow: `0px 3px 8px ${vars.color['shadow-40']}`,
  zIndex: zIndex('WYSIWYG_MODAL'),
});

export const innerStyle = style({
  width: 'fit-content',
  height: 'fit-content',
  overflow: 'auto',
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
