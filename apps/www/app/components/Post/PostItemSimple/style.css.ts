import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const contentStyle = style({
  padding: 16,
  paddingBottom: 0,
  background: vars.color.highlight,
  borderRadius: 8,
});

export const footerStyle = style({
  fontSize: rootVars.font.size.small,
});
