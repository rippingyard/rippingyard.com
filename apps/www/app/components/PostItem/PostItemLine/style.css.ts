﻿import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery } from '~/utils/style';

export const containerStyle = style({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: `1px solid ${vars.color.shadow}`,
  overflow: 'hidden',
  ':hover': {
    backgroundColor: vars.color.highlight,
  },
  '@media': {
    [mediaQuery('SP')]: {
      flexDirection: 'column-reverse',
      gap: 8,
    },
  },
});

export const contentStyle = style({
  width: '100%',
});

export const headingStyle = style({
  fontSize: rootVars.font.size.medium,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 4,
  lineHeight: 1.6,
});

export const summaryStyle = style({
  fontSize: rootVars.font.size.small,
});

export const summaryWithoutTitleStyle = style({
  fontSize: rootVars.font.size.medium,
  fontStyle: 'italic',
  // fontWeight: rootVars.font.weight.bold,
  color: vars.color['neutral-60'],
});

export const footerStyle = style({
  fontSize: rootVars.font.size['x-small'],
});

export const imageStyle = style({
  flexShrink: 0,
  width: 90,
  height: 90,
  borderRadius: rootVars.border.radius.large,
  overflow: 'hidden',
  '@media': {
    [mediaQuery('SP')]: {
      borderRadius: rootVars.border.radius.normal,
      height: 140,
      width: '100%',
    },
  },
});

globalStyle(`${imageStyle} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
