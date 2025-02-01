import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const textboxStyle = style({
  boxSizing: 'border-box',
  textAlign: 'center',
  padding: '2px 6px',
  border: `2px solid ${vars.color['neutral-40']}`,
  borderRadius: rootVars.border.radius.normal,
  outline: 'none',
});

export const dummyTextboxStyle = style({
  display: 'inline-block',
  position: 'absolute',
  height: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
  padding: '8px 12px',
});
