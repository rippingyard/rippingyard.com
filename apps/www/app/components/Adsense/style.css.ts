import { styleVariants } from '@vanilla-extract/css';

export const container = styleVariants({
  square: { minHeight: 240 },
  horizontal: { minHeight: 90 },
  vertical: { minHeight: 240 },
});
