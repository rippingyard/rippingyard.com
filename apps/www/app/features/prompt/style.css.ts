import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const itemStyle = style({
  borderBottom: `1px solid ${vars.color.shadow}`,
  padding: '12px 0',
  // marginBottom: 12,
});

export const assistantStyle = style({});

export const userStyle = style({
  textAlign: 'right',
});
