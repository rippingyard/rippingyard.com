import { style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  width: rootVars.avatar.size,
  height: rootVars.avatar.size,
  borderRadius: rootVars.border.radius.normal,
  overflow: 'hidden',
});

export const imageStyle = style({
  width: rootVars.avatar.size,
  height: rootVars.avatar.size,
  objectFit: 'cover',
});
