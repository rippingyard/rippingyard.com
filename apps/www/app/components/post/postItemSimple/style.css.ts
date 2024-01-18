import { style } from '@vanilla-extract/css';

import { gray } from '~/utils/style';

export const contentStyle = style({
  padding: 16,
  paddingBottom: 0,
  background: gray(),
  borderRadius: 8,
});

export const footerStyle = style({
  fontSize: '0.8em',
});
