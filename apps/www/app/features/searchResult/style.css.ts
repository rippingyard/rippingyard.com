import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const noResultStyle = style({
  padding: 32,
  textAlign: 'center',
  fontSize: rootVars.font.size['large'],
  fontWeight: rootVars.font.weight.bold,
  border: `2px solid ${vars.color.neutral}`,
});
