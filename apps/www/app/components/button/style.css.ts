import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const buttonStyle = style({
  border: `1px solid ${vars.color.neutral}`,
  borderRadius: 8,
  padding: '8px 16px',
});
