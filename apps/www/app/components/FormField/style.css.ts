import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  position: 'relative',
  paddingBottom: 32,
});

export const labelStyle = style({
  display: 'block',
  fontSize: rootVars.font.size.small,
  fontWeight: rootVars.font.weight.bold,
  opacity: 0.8,
});

export const errorContainerStyle = style({
  color: vars.color.background,
  fontSize: rootVars.font.size['x-small'],
  marginTop: 10,
  position: 'relative',
  backgroundColor: vars.color.warning,
  padding: '8px 12px',
  ':hover': {
    cursor: 'pointer',
  },
  selectors: {
    '&::after': {
      content: '',
      borderStyle: 'solid',
      borderWidth: 7,
      borderColor: `transparent transparent ${vars.color.warning} transparent`,
      position: 'absolute',
      top: -7,
      transform: 'translateY(-50%)',
      left: 20,
    },
  },
});
