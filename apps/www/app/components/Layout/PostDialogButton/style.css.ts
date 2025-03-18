import { style } from '@vanilla-extract/css';

import { zIndex } from '~/utils/style';

export const containerStyle = style({
  position: 'fixed',
  bottom: 10,
  right: 10,
  zIndex: zIndex('FIXED_HEADER'),
});
