import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery } from '~/utils/style';

export const container = style({
  display: 'block',
  padding: 16,
  marginBottom: 24,
  border: `1px solid ${vars.color.shadow}`,
  overflow: 'hidden',
  ':hover': {
    backgroundColor: vars.color.highlight,
  },
});

globalStyle(`a${container}`, {
  textDecoration: 'none',
  color: vars.color.neutral,
});

globalStyle(`${container} > h4`, {
  padding: 0,
  marginBottom: 12,
  fontSize: rootVars.font.size.medium,
  lineHeight: 1.6,
});

export const columns = style({
  display: 'flex',
  gap: 16,
  alignItems: 'top',
  '@media': {
    [mediaQuery('SP')]: {
      flexDirection: 'column-reverse',
      gap: 8,
    },
  },
});

export const content = style({
  width: '100%',
});

export const heading = style({
  fontSize: rootVars.font.size.medium,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 4,
  lineHeight: 1.6,
});

export const summary = style({
  color: vars.color['neutral-60'],
});

globalStyle(`p${summary}`, {
  fontSize: rootVars.font.size['x-small'],
  lineHeight: 1.6,
});

export const summaryWithoutTitle = style({
  fontSize: rootVars.font.size.medium,
  fontStyle: 'italic',
  // fontWeight: rootVars.font.weight.bold,
  color: vars.color['neutral-60'],
});

export const footer = style({
  fontSize: rootVars.font.size['xx-small'],
  fontWeight: rootVars.font.weight.bold,
  color: vars.color['neutral-60'],
});

export const image = style({
  flexShrink: 0,
  width: 140,
  height: 140,
  borderRadius: rootVars.border.radius.large,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
  '@media': {
    [mediaQuery('SP')]: {
      borderRadius: rootVars.border.radius.normal,
      height: 140,
      width: '100%',
    },
  },
});
