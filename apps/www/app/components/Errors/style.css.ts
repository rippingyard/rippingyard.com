import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  marginBottom: 32,
  padding: 16,
  border: `2px solid ${vars.color.warning}`,
  fontSize: rootVars.font.size['x-small'],
  color: vars.color.warning,
});
