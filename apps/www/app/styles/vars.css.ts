import { createGlobalTheme } from '@vanilla-extract/css';

import { FONT } from '~/utils/style';

export const rootVars = createGlobalTheme(':root', {
  font: {
    family: {
      normal: FONT.NORMAL,
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
