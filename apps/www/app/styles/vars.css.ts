﻿/* eslint-disable quotes */
import { createGlobalTheme } from '@vanilla-extract/css';

import { mediaQuery } from '~/utils/style';

export const rootVars = createGlobalTheme(':root', {
  font: {
    family: {
      normal:
        "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
      serif: 'serif',
      rich: "'Oswald', sans-serif",
    },
    size: {
      base: '18px',
      sp: '16px',
      'xxx-large': '2.2rem',
      'xx-large': '1.6rem',
      'x-large': '1.4rem',
      large: '1.1rem',
      medium: '1rem',
      small: '0.9rem',
      'x-small': '0.8rem',
      'xx-small': '0.65rem',
    },
    weight: {
      normal: '400',
      bold: '800',
    },
  },
  border: {
    radius: {
      sharp: '3px',
      normal: '8px',
      large: '16px',
      circle: '999px',
    },
  },
  avatar: {
    size: '120px',
  },
  size: {
    billboard: {
      height: 'calc(100vh - 120px)',
      minHeight: 'calc(100vh - 112px)',
    },
  },
});
