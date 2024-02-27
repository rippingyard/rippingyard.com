import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const contentStyle = style({
  display: 'block',
  padding: '16px 0',
  borderBottom: `1px solid ${vars.color.shadow}`,
  ':hover': {
    backgroundColor: vars.color.highlight,
  },
});

export const headingStyle = style({
  fontSize: rootVars.font.size.medium,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 4,
});

export const summaryStyle = style({
  fontSize: rootVars.font.size.small,
});

export const footerStyle = style({
  fontSize: rootVars.font.size.tiny,
});
