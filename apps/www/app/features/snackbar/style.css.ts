import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  display: 'block',
  position: 'fixed',
  width: 'fit-content',
  bottom: 10,
  left: 10,
  backgroundColor: vars.color['shadow-60'],
  color: vars.color.neutral,
  fontSize: rootVars.font.size.small,
  // fontWeight: rootVars.font.weight.bold,
  borderRadius: rootVars.border.radius.normal,
  padding: '10px 14px',
  zIndex: zIndex('MODAL'),
  WebkitBackdropFilter: 'blur(8px)',
  backdropFilter: 'blur(8px)',
  cursor: 'pointer',
  transition: 'bottom 0.4s ease-out',
  ':hover': {
    backgroundColor: vars.color['shadow-80'],
  },
});

export const alertStyle = style({
  backgroundColor: vars.color.warning,
  color: vars.color.background,
});

export const hiddenStyle = style({
  bottom: -100,
  opacity: 0,
});
