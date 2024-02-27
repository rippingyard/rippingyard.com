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
      large: '1.6rem',
      medium: '1.2rem',
      normal: '1rem',
      small: '0.8rem',
      tiny: '0.7rem',
    },
    weight: {
      normal: '400',
      bold: '800',
    },
  },
});
