﻿import { globalStyle, style } from '@vanilla-extract/css';

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
  alignItems: 'stretch',
  textAlign: 'left',
  backgroundColor: vars.color.background,
});

export const contentWithNoTitleStyle = style({
  // padding: 16,
  // paddingBottom: 0,
  fontSize: rootVars.font.size['x-large'],
  fontWeight: rootVars.font.weight.bold,
  // background: vars.color.highlight,
  borderRadius: rootVars.border.radius.normal,
});

export const contentStyle = style({
  zIndex: zIndex('COVER'),
  padding: 32,
  width: '100%',
  flexShrink: 0, // コンテンツが縮まないようにする
  backgroundColor: vars.color.background,
  boxSizing: 'border-box',
});

export const contentWithBorderStyle = style({
  borderTop: `1px dashed ${vars.color.neutral}`,
});

export const headingStyle = style({
  outline: 'none',
  overflow: 'hidden',
  fontSize: rootVars.font.size['x-large'],
  lineHeight: 1.4,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 8,
});

globalStyle(`${headingStyle} a`, {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle(`${headingStyle} a:hover`, {
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const summaryStyle = style({
  fontSize: rootVars.font.size['x-small'],
});

export const footerStyle = style({
  paddingTop: 8,
  fontSize: rootVars.font.size['xx-small'],
});

export const imageStyle = style({
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: zIndex('NORMAL'),
  flexGrow: 1, // 余ったスペースを全て使う
  flexShrink: 1, // 必要に応じて縮む
  minHeight: 0, // flexboxの子要素が正しく縮むために必要
  backgroundColor: '#111',
});

globalStyle(`${imageStyle} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
