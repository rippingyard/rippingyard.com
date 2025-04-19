import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const BORDER_SIZE = 12;

export const containerStyle = style({
  boxSizing: 'content-box',
  width: `calc(100vw - 48px - ${BORDER_SIZE * 2}px)`,
  height: rootVars.size.billboard.height,
  border: `${BORDER_SIZE}px solid ${vars.color.neutral}`,
});
