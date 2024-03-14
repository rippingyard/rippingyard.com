import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const dateStyle = style({
  fontSize: rootVars.font.size['x-small'],
  color: vars.color.shadow,
  paddingTop: 5,
});
