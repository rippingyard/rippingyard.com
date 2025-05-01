import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const container = style({
  listStyle: 'none',
  display: 'inline-flex',
  border: `2px solid ${vars.color['neutral-40']}`,
  borderRadius: rootVars.border.radius.normal,
  overflow: 'hidden',
});

export const item = style({
  padding: '8px 12px 10px',
  lineHeight: 1,
  borderRight: `1px solid ${vars.color['neutral-40']}`,
  color: vars.color['neutral-60'],
  fontWeight: rootVars.font.weight.bold,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.secondry,
  },
});

globalStyle(`${item}:last-child`, {
  border: 0,
});
