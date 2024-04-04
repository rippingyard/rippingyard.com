import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  outline: 'none',
});

export const modalStyle = style({
  display: 'block',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: zIndex('WYSIWYG_MODAL'),
  width: '100vw',
  height: '100vh',
  backgroundColor: vars.color.background,
});
