import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const listStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  // justifyContent: 'space-between',
  gap: 6,
});

export const itemStyle = style({
  padding: '6px 12px',
  color: vars.color['neutral-60'],
  fontSize: rootVars.font.size.small,
  backgroundColor: vars.color['shadow-20'],
  marginRight: 8,
  borderRadius: rootVars.border.radius.normal,
  cursor: 'pointer',
  ':hover': {
    color: vars.color.neutral,
    backgroundColor: vars.color['shadow-40'],
  },
});

export const selectedItemStyle = style({
  backgroundColor: vars.color.secondry,
  fontWeight: rootVars.font.weight.bold,
});
