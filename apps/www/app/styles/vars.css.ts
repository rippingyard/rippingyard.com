/* eslint-disable quotes */
import { createGlobalTheme } from '@vanilla-extract/css';

export const rootVars = createGlobalTheme(':root', {
  font: {
    family: {
      normal:
        "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
    },
    size: {
      base: '18px',
      small: '0.8rem',
    },
    weight: {
      normal: '400',
      bold: '800',
    },
  },
});
