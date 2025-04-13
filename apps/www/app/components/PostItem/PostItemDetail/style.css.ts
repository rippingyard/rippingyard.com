import { globalStyle, style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  marginBottom: 32,
});

export const contentWithNoTitleStyle = style({
  padding: 0,
  // paddingBottom: 0,
  // background: vars.color.highlight,
  // borderRadius: rootVars.border.radius.normal,
});

export const headingStyle = style({
  outline: 'none',
  // lineHeight: 1.8,
  overflow: 'hidden',
  paddingBottom: 25,
  fontSize: rootVars.font.size['xxx-large'],
  lineHeight: 1.4,
  fontWeight: rootVars.font.weight.bold,
  paddingTop: rootVars.font.size['xxx-large'],
});

globalStyle(`${headingStyle} a`, {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle(`${headingStyle} a:hover`, {
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const footerStyle = style({
  fontSize: rootVars.font.size.small,
});
