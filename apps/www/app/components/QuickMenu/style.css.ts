import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({});

export const itemStyle = style({
  lineHeight: 1.4,

  borderRadius: rootVars.border.radius.sharp,
  ':hover': {
    backgroundColor: vars.color['neutral-20'],
    // color: vars.color.background,
  },
});

globalStyle(`${itemStyle} > a`, {
  display: 'block',
  padding: 12,
});

export const itemLabelStyle = style({
  fontSize: rootVars.font.size['x-large'],
  fontWeight: rootVars.font.weight.bold,
  // color: vars.color.neutral,
  textTransform: 'uppercase',
});

export const itemCaptionStyle = style({
  fontSize: rootVars.font.size['x-small'],
  fontWeight: rootVars.font.weight.normal,
});

export const labelStyle = style({
  fontSize: rootVars.font.size['x-small'],
  paddingLeft: 8,
});
