import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const IMAGE_SIZE = 120;

export const containerStyle = style({
  display: 'flex',
  gap: 16,
  padding: 16,
  border: `1px solid ${vars.color['shadow-40']}`,
  borderRadius: rootVars.border.radius.large,
});

export const mainStyle = style({
  width: '100%',
});

export const sideStyle = style({
  width: IMAGE_SIZE,
  flexShrink: 0,
});

export const nameStyle = style({
  fontSize: rootVars.font.size['x-large'],
  fontWeight: rootVars.font.weight.bold,
});

export const imageContainerStyle = style({
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  borderRadius: rootVars.border.radius.normal,
  overflow: 'hidden',
});

export const imageStyle = style({
  width: IMAGE_SIZE,
  objectFit: 'contain',
});
