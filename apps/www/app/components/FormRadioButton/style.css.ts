import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const radioButtonStyle = style({
  ':before': {
    content: '',
    display: 'block',
    width: '1.2em',
    height: '1.2em',
    borderRadius: rootVars.border.radius.circle,
    border: `0.24em solid ${vars.color.shadow}`,
    transition: '0.2s ease-in-out',
  },
});

export const checkedStyle = style({
  ':before': {
    border: `0.4em solid ${vars.color.primary}`,
  },
});
