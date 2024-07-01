import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  marginBottom: 32,
  display: 'flex',
  border: `1px solid ${vars.color['shadow-60']}`,
  borderRadius: rootVars.border.radius.large,
  padding: '8px 16px',
});

export const buttonContainerStyle = style({
  minWidth: 80,
  width: '18%',
});
