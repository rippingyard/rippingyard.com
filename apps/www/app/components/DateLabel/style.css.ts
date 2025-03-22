import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery } from '~/utils/style';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  width: 80,
  // margin: 'auto',
  borderTop: `3px solid ${vars.color.neutral}`,
  borderBottom: `8px solid ${vars.color.neutral}`,
  backgroundColor: vars.color.background,
});

export const dayStyle = style({
  fontSize: rootVars.font.size['xxx-large'],
  fontWeight: rootVars.font.weight.bold,
  lineHeight: 1.6,
});
export const monthStyle = style({
  textTransform: 'uppercase',
  fontFamily: rootVars.font.family.serif,
  fontSize: rootVars.font.size['x-small'],
  color: vars.color.background,
  backgroundColor: vars.color.success,
  fontWeight: rootVars.font.weight.bold,
  // border: `3px solid ${vars.color.neutral}`,
  lineHeight: 1.6,
});
export const yearStyle = style({
  fontSize: rootVars.font.size['x-small'],
  lineHeight: 1.8,
});

export const hourStyle = style({
  fontSize: rootVars.font.size['x-small'],
  borderTop: `1px dotted ${vars.color.neutral}`,
  '@media': {
    [mediaQuery('TB')]: {
      display: 'none',
    },
  },
});
