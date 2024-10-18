import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const entityItemStyle = style({
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: 0,
  color: vars.color['neutral-60'],
  fontSize: rootVars.font.size.small,
  // backgroundColor: vars.color['shadow-20'],
  marginRight: 16,
  // borderRadius: rootVars.border.radius.normal,
  cursor: 'pointer',
  ':hover': {
    color: vars.color['neutral-60'],
    // backgroundColor: vars.color['shadow-40'],
  },
});

export const checkedEntityStyle = style({
  color: vars.color.neutral,
  // backgroundColor: vars.color.secondry,
  ':hover': {
    // color: vars.color.neutral,
    // backgroundColor: vars.color['shadow-80'],
  },
});

export const tagListStyle = style({
  paddingTop: 8,
});
