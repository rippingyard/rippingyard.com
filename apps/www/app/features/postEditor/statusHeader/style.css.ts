import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  display: 'flex',
  gap: 16,
  padding: '32px 0 0',
});

export const itemStyle = style({
  fontSize: rootVars.font.size['x-small'],
});

export const addTitleStyle = style({
  backgroundColor: vars.color['shadow-20'],
  padding: 12,
  borderRadius: rootVars.border.radius.large,
  ':hover': {
    backgroundColor: vars.color.shadow,
    cursor: 'pointer',
  },
});

export const dateStyle = style({
  fontWeight: rootVars.font.weight.bold,
  cursor: 'pointer',
});
