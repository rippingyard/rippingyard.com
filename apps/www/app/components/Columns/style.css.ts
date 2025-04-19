import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  boxSizing: 'content-box',
  display: 'flex',
  width: '100%',
  height: rootVars.size.billboard.height,
});

export const columnStyle = style({
  borderRight: `1px solid ${vars.color.neutral}`,
});

globalStyle(`${columnStyle}:last-child`, {
  borderRight: 'none',
});
