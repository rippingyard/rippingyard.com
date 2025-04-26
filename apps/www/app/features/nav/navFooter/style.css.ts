import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const container = style({
  borderTop: `1px dashed ${vars.color.neutral}`,
  marginTop: 12,
  padding: 12,
  fontSize: rootVars.font.size['x-small'],
  display: 'flex',
  justifyContent: 'space-between',
});

export const list = style({
  display: 'flex',
  gap: 16,
});

export const listItem = style({});

export const clickable = style({
  cursor: 'pointer',
});
