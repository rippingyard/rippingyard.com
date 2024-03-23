import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const inputStyle = style({
  width: '100%',
  borderBottom: `1px solid ${vars.color.neutral}`,
  fontSize: rootVars.font.size.small,
  padding: '5px 0',
});
