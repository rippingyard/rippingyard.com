﻿import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const containerStyle = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const itemStyle = style({
  overflow: 'hidden',
});

export const thStyle = style({
  padding: 8,
  verticalAlign: 'middle',
  borderBottom: `2px solid ${vars.color.neutral}`,
});

export const checkboxContainerStyle = style({
  paddingTop: 6,
});
