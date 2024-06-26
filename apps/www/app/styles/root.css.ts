﻿import { style } from '@vanilla-extract/css';

import { mediaQuery } from '~/utils/style';

import { vars } from './theme.css';
import { rootVars } from './vars.css';

export const bodyStyle = style({
  margin: 0,
  padding: 0,
  fontFamily: rootVars.font.family.normal,
  fontSize: rootVars.font.size.base,
  lineHeight: 1.8,
  backgroundColor: vars.color.background,
  color: vars.color.neutral,
  minHeight: '100%',
  '@media': {
    [mediaQuery('SP')]: {
      fontSize: rootVars.font.size.sp,
    },
  },
});
