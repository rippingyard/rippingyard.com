import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const stackTrace = style({
  fontSize: rootVars.font.size['x-small'],
  color: vars.color['neutral-60'],
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});
