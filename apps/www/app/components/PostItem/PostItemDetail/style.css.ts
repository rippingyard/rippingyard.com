import { globalStyle, style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const container = style({
  marginBottom: 32,
});

export const contentWithNoTitle = style({
  padding: 0,
  // paddingBottom: 0,
  // background: vars.color.highlight,
  // borderRadius: rootVars.border.radius.normal,
});

export const heading = style({
  outline: 'none',
  // lineHeight: 1.8,
  overflow: 'hidden',
  paddingBottom: 25,
  fontSize: rootVars.font.size['xxx-large'],
  lineHeight: 1.4,
  fontWeight: rootVars.font.weight.bold,
  paddingTop: rootVars.font.size['xxx-large'],
});

globalStyle(`${heading} a`, {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle(`${heading} a:hover`, {
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const tags = style({
  marginBottom: 8,
});

export const footer = style({
  fontSize: rootVars.font.size.small,
});
