﻿import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { mediaQuery } from '~/utils/style';

import { rootVars } from '../../styles/vars.css';

export const containerStyle = style({
  fontSize: '0.9rem',
  fontWeight: rootVars.font.weight.bold,
  // color: vars.color.highlight,
  color: vars.color.neutral,
  // backgroundColor: vars.color.primary,
  lineHeight: 1,
  margin: 'auto',
  // marginBottom: 16,
  width: 'calc(100% - 48px)',
  '@media': {
    [mediaQuery('SP')]: {
      width: 'calc(100% - 32px)',
    },
  },
});

export const innerStyle = style({
  margin: 'auto',
  padding: 32,
  borderBottom: `1px solid ${vars.color.neutral}`,
});

export const partialStyle = style({
  display: 'inline-block',
  fontSize: '0.8rem',
  fontWeight: rootVars.font.weight.bold,
  padding: '16px 0',
  borderBottom: `4px solid ${vars.color.neutral}`,
});
