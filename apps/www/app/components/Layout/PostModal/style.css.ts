import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  width: '80vw',
  maxWidth: 680,
  padding: 25,
  paddingBottom: 12,
});

export const bodyStyle = style({
  borderBottom: `1px solid ${vars.color['neutral-40']}`,
});

export const footerStyle = style({
  display: 'flex',
  justifyContent: 'flex-end',
  fontSize: rootVars.font.size.small,
  paddingTop: 12,
});
