// import { css } from '@emotion/react';

export enum FONT {
  // eslint-disable-next-line quotes
  NORMAL = "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
}

export enum LAYER {
  FIXED_HEADER = 100,
}

export const black = (opacity: number = 1) => `hsla(0, 0%, 7%, ${opacity})`;
export const white = (opacity: number = 1) => `hsla(0, 0%, 96%, ${opacity})`;
export const gray = (opacity: number = 1) => `hsla(0, 0%, 93%, ${opacity})`;
export const grayDark = (opacity: number = 1) => `hsla(0, 0%, 67%, ${opacity})`;
export const blue = (opacity: number = 1) => `rgba(41, 85, 113, ${opacity})`;
export const cyan = (opacity: number = 1) => `hsla(194, 99%, 58%, ${opacity})`;
export const yellow = (opacity: number = 1) =>
  `hsla(47, 100%, 58%, ${opacity})`;

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];

// $orange: hsl(14, 100%, 53%);
// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;
