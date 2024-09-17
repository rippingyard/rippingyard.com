import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const entityItemStyle = style({
  display: 'inline-block',
  padding: '6px 12px',
  color: vars.color['neutral-60'],
  fontSize: rootVars.font.size.small,
  backgroundColor: vars.color['shadow-20'],
  marginRight: 8,
  borderRadius: rootVars.border.radius.normal,
  cursor: 'pointer',
  ':hover': {
    color: vars.color.neutral,
    backgroundColor: vars.color['shadow-40'],
  },
});

export const checkedEntityStyle = style({
  color: vars.color.neutral,
  backgroundColor: vars.color.secondry,
  ':hover': {
    color: vars.color.neutral,
    backgroundColor: vars.color['shadow-80'],
  },
});
