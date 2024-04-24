import { style } from '@vanilla-extract/css';

import { size } from '~/utils/style';

export const containerStyle = style({
  maxWidth: size('MAIN'),
  margin: 'auto',
  padding: 24,
  height: '100%',
});

export const edgeStyle = style({
  paddingTop: 0,
  paddingBottom: 0,
});
