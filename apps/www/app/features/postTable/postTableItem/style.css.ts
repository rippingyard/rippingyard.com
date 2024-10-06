import { globalStyle, style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  // padding: 8,
});

export const headingStyle = style({
  fontSize: rootVars.font.size.large,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 8,
  lineHeight: 1.6,
});

export const footerStyle = style({
  display: 'flex',
  gap: 4,
  paddingTop: 8,
});

export const summaryStyle = style({
  fontSize: rootVars.font.size.small,
  marginBottom: 8,
});

export const imageStyle = style({
  flexShrink: 0,
  width: '100%',
  height: 140,
  borderRadius: rootVars.border.radius.large,
  overflow: 'hidden',
  // '@media': {
  //   [mediaQuery('SP')]: {
  //     borderRadius: rootVars.border.radius.normal,
  //     height: 140,
  //     width: '100%',
  //   },
  // },
});

globalStyle(`${imageStyle} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
