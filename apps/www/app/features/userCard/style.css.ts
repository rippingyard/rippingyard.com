import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  display: 'flex',
  width: '100%',
  gap: 16,
  padding: 16,
  border: `1px solid ${vars.color['shadow-40']}`,
  borderRadius: rootVars.border.radius.large,
});

export const mainStyle = style({
  width: '100%',
});

export const sideStyle = style({
  width: rootVars.avatar.size,
  flexShrink: 0,
});

export const nameStyle = style({
  fontSize: rootVars.font.size['x-large'],
  fontWeight: rootVars.font.weight.bold,
  lineHeight: 1.4,
});

export const idStyle = style({
  fontSize: rootVars.font.size['x-small'],
  fontWeight: rootVars.font.weight.bold,
  color: vars.color['neutral-60'],
});
