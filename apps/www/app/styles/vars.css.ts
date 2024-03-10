/* eslint-disable quotes */
import { createGlobalTheme } from '@vanilla-extract/css';

export const rootVars = createGlobalTheme(':root', {
  font: {
    family: {
      normal:
        "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
      serif: 'serif',
    },
    size: {
      base: '18px',
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
});
