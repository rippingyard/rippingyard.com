import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  // padding: 32,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'left',
  backgroundColor: vars.color.primary,
});

export const contentWithNoTitleStyle = style({
  padding: 16,
  paddingBottom: 0,
  // background: vars.color.highlight,
  borderRadius: rootVars.border.radius.normal,
});

export const contentStyle = style({
  zIndex: zIndex('COVER'),
  padding: 32,
  width: '100%',
  // height: '40%',
  // flexGrow: 2,
  backgroundColor: vars.color.primary,
});

export const headingStyle = style({
  outline: 'none',
  // lineHeight: 1.8,
  overflow: 'hidden',
  // paddingBottom: 25,
  fontSize: rootVars.font.size['x-large'],
  lineHeight: 1.4,
  fontWeight: rootVars.font.weight.bold,
  // paddingTop: rootVars.font.size['xxx-large'],
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

export const imageStyle = style({
  // position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'fit-content',
  flexShrink: 0,
  zIndex: zIndex('NORMAL'),
  // selectors: {
  //   '&::after': {
  //     content: '',
  //     display: 'block',
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     width: '100%',
  //     height: '100%',
  //     // display: 'flex',
  //     // justifyContent: 'center',
  //     // alignItems: 'center',
  //     // textAlign: 'center',
  //     WebkitBackdropFilter: 'sepia(90%)',
  //     backdropFilter: 'brightness(140%) blur(4px)',
  //   },
  // },
});

globalStyle(`${imageStyle} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
