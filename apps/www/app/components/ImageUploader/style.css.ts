import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  padding: 15,
  height: '100%',
});

export const innerStyle = style({
  padding: 10,
  height: '100%',
  border: `1px solid ${vars.color.shadow}`,
  borderRadius: rootVars.border.radius.large,
});
